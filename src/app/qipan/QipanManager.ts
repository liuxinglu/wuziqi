module app {
	export class QipanManager {
		public constructor() {
			this.dataHandler = new DataHandler();
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.GET_STUDENTS_FROM_SERVER, this._getStudents, this);
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.GET_USER_LIST, this._userListHandler, this);
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.SEL_DEFENDER, this._selDefender, this);
		}

		model:number  = 0;//0 1 2 初中高
		dataHandler:DataHandler;
		userList:Array<UserInfo> = [];
		readOnly:boolean = true;
		viewData:ViewData = new ViewData();
		
		private _selDefender(e:lxl.CEvent) {
			this.viewData.defenderToken = e.param;
			this.viewData.curRole = "attacker";
			let info = lxl.Tool.callJS("getInfoToken");
			if(info._userRole == "COORDINATOR") {
				this.readOnly = false;
			}
			else {
				if(info.loginToken == e.param) {
					this.readOnly = false;
				} else {
					this.readOnly = true;
				}
			}
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SEL_DEFENDER_COMPLETE));
		}

		private _userListHandler(e:lxl.CEvent) {
			this.userList = lxl.Tool.objectToArray(e.param);
			this.viewData.userList = this.userList;
			for(let i = 0; i < this.userList.length; i++) {
				if(this.userList[i].userType == "teacher") {
					this.viewData.curRole = "attacker";
					this.viewData.attackerToken = this.userList[i].token;
					break;
				}
			}
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.GET_LIST));
		}

		private _getStudents(e:lxl.CEvent) {
			let info = lxl.Tool.callJS("getInfoToken");
			if(info._userRole == "COORDINATOR") {
				let vd:UserInfo;
				for(let i = 0; i < e.param.length; i++) {
					vd = new UserInfo();
					vd.userType = "student";
					vd.token = e.param[i].loginToken;
					vd.studentInfo = e.param[i];
					vd.userName = e.param[i].info.userName;
					this.userList.push(vd);
				}
				vd = new UserInfo();
				vd.userType = "teacher";
				vd.token = info.loginToken;
				vd.chessType = "attacker";
				vd.userName = info.userName;
				this.userList.push(vd);
				this.dataHandler.setUserList(this.userList);
			}
		}

		judgeWhoWin(gridArr:Array<lxl.data.Map>):string {
			let countArr = [{count:1, type:""}, {count:1, type:""}, {count:1, type:""}, {count:1, type:""}];
			for(let i = 1; i < 16; i++) {
				for(let j = 1; j < 16; j++) {
					let g1:Grid = lxl.Tool.getValueByKey(gridArr, i + "_" + j);
					let g2:Grid = lxl.Tool.getValueByKey(gridArr, i + "_" + (j + 1));
					if(g2 != null) {
						if(g1.data.chessType == g2.data.chessType && g1.data.chessType != undefined) {
							countArr[0].count++;
							countArr[0].type = g1.data.chessType;
							if(countArr[0].count == 4)
								return countArr[0].type;
						} else {
							countArr[0].count = 0;
						}
					} else 
						break;
				}
				for(let k = 1; k < 16; k++) {
					let g1:Grid = lxl.Tool.getValueByKey(gridArr, k + "_" + i);
					let g2:Grid = lxl.Tool.getValueByKey(gridArr, (k + 1) + "_" + i);
					if(g2 != null) {
						if(g1.data.chessType == g2.data.chessType && g1.data.chessType != undefined) {
							countArr[1].count++;
							countArr[1].type = g1.data.chessType;
							if(countArr[1].count == 4)
								return countArr[1].type;
						} else {
							countArr[1].count = 0;
						}
					} else 
						break;
				}
			}
			for(let i = 0; i < 15; i++) {
				let tempi = i;
				for(let j = 0; j < 15; j++) {
					let g1:Grid = lxl.Tool.getValueByKey(gridArr, (i + 1) + "_" + (j + 1));
					let g2:Grid = lxl.Tool.getValueByKey(gridArr, (i + 2) + "_" + (j + 2));
					if(g2 != null) {
						if(g1.data.chessType == g2.data.chessType && g1.data.chessType != undefined) {
							countArr[2].count++;
							countArr[2].type = g1.data.chessType;
							i++;
							if(countArr[2].count == 4)
								return countArr[2].type;
						} else {
							countArr[2].count = 0;
						}
					} else {
						i = tempi;
						break;
					}
				}
			}
			for(let j = 14; j > 0; j--) {
				let tempj = j;
				for(let i = 0; i < 15; i++) {
					let g1:Grid = lxl.Tool.getValueByKey(gridArr, (i + 1) + "_" + j);
					let g2:Grid = lxl.Tool.getValueByKey(gridArr, (i + 2) + "_" + (j - 1));

					if(g2 != null) {
						if(g1.data.chessType == g2.data.chessType && g1.data.chessType != undefined) {
							countArr[3].count++;
							countArr[3].type = g1.data.chessType;
							j--;
							if(countArr[3].count == 4)
								return countArr[3].type;
						} else {
							countArr[3].count = 0;
						}
					} else {
						j = tempj;
						break;
					}
				}
			}

			for(let i = 0; i < countArr.length; i++) {
				if(countArr[i].count >= 4) {
					return countArr[i].type;
				} else if(i == countArr.length - 1) {
					return "";
				}
			}
		}

		findEmptyGrids(arr:Array<Grid>, grid:Grid):void {
			for(var i = arr.length - 1; i >= 0; i--) {
				if(arr[i].logicPos == grid.logicPos) {
					arr.splice(i, 1);
					break;
				}
			}
		}

		/**
		 * 返回通过grid来确定周围有count个空闲位置的数组
		 */
		getEmptyGrid(arr:Array<Grid>, count:number):Array<Grid> {
			var arrGrid = [];
			var arrCurPos = [];
			let cg:Grid = new Grid();
			for(let j = 0; j < arr.length; j++) {
				cg.logicPos = arr[j].logicPos;
				arrCurPos = cg.logicPos.split("_");
				for(let i = 0; i < arr.length; i++) {
					let pos = arr[i].logicPos;
					let arrPos = pos.split("_");
					if((arrPos[0] == arrCurPos[0] && (parseInt(arrPos[1])  == parseInt(arrCurPos[1]) + 1 || parseInt(arrPos[1]) == parseInt(arrCurPos[1]) - 1)) || 
						(arrPos[1] == arrCurPos[1] && (parseInt(arrPos[0]) == parseInt(arrCurPos[0]) + 1 || parseInt(arrPos[0]) == parseInt(arrCurPos[0]) - 1))) {
						let curpos = arr[i].logicPos.split("_");
						for(let k = 0; k < arrGrid.length; k++) {
							let pos2 = arrGrid[k].logicPos;
							let arrPos2 = pos2.split("_");
							if((arrPos2[0] == curpos[0] && (parseInt(arrPos2[1])  == parseInt(curpos[1]) + 1 || parseInt(arrPos2[1]) == parseInt(curpos[1]) - 1)) || 
								(arrPos2[1] == curpos[1] && (parseInt(arrPos2[0]) == parseInt(curpos[0]) + 1 || parseInt(arrPos2[0]) == parseInt(curpos[0]) - 1))) {
									arrGrid.push(arr[i]);
									break;
								}
						}
						lxl.logs.log("cg.logicPos:" + cg.logicPos + " " +arr[i].logicPos);
						if(arrGrid.length == 0)
							arrGrid.push(arr[i]);
						cg.logicPos = arr[i].logicPos;
						arrCurPos = cg.logicPos.split("_");
						if(arrGrid.length == count) {
							lxl.logs.log("----");
							return arrGrid;
						}
					}
				}
			}
			return [];
		}

		private static _qipan:QipanManager;
		public static getInstance():QipanManager {
			if(this._qipan == null)
				this._qipan = new QipanManager();
			return this._qipan;
		}
	}
}