module app {
	export class TeachWatchView extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "TeacherWatchViewSkin.exml");
		}

		private g:eui.Group;
		private _xArr:Array<string>;
		private _yArr:Array<string>;
		private _gridArr:Array<lxl.data.Map> = [];
		private group:eui.Group;
		private _qiziSound:egret.Sound;
		private _lock:boolean = false;
		private lab_target:eui.Label;
		private scrollGroup:eui.Group;
		private svList:Array<StudentItemView> = [];
		private arrQipanParts:Array<Grid> = []; 
		private _curSelStudent:ViewData;
		private _curTimes:number = 0;
		private _maxTimes:number = 4;
		private _eachTimes:number = 3;
		private lab_desc:eui.Label;

		onActivity() {
			super.onActivity();
			this._qiziSound = Res.getRes("qizi_mp3");
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.GET_LIST, this._updateStudentList, this);
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.SEL_DEFENDER_COMPLETE, this._updateUserListState, this);
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.CHESS_MOVE, this._chessMove, this);
			this._updateStudentList(null);
			
		}

		private _updateUserListState(e:lxl.CEvent) {
			for(let i = 0; i < this.scrollGroup.numChildren; i++) {
				if(this.scrollGroup.getChildAt(i)) {
					if((this.scrollGroup.getChildAt(i) as StudentItemView).data.token == Qipan.viewData.defenderToken) {
						(this.scrollGroup.getChildAt(i) as StudentItemView).data.chessType = "defender";
						(this.scrollGroup.getChildAt(i) as StudentItemView).setActivity();
					} else {
						(this.scrollGroup.getChildAt(i) as StudentItemView).data.chessType = "";
						(this.scrollGroup.getChildAt(i) as StudentItemView).unActivity();
					}
				}
			}
			let xx = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14";
			let yy = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14";
			this.setXY(xx, yy);
		}

		private _updateStudentList(e:lxl.CEvent) {
			let sv:StudentItemView;
			for(let i = 0; i < Qipan.userList.length; i++) {
				if(Qipan.userList[i].userType == "student") {
					sv = new StudentItemView();
					sv.name = Qipan.userList[i].token;
					sv.data = Qipan.userList[i];
					sv.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, ()=>{
						sv.updateData();
						this.svList.push(sv);
						if(this.scrollGroup.getChildByName(this.svList[this.svList.length - 1].name))
							(this.scrollGroup.getChildByName(this.svList[this.svList.length - 1].name) as StudentItemView).updateData();
						else {
							this.scrollGroup.addChild(this.svList[this.svList.length - 1])
							this.svList[this.svList.length - 1].addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickItemHandler, this);
						}
					}, this);
				}
			}
		}

		private _clickItemHandler(e:egret.TouchEvent) {
			let vd:UserInfo = e.currentTarget.data;
			Qipan.dataHandler.selDefender(vd.token);
		}

		setXY(xx:string, yy:string) {
			this._xArr = xx.split(",");
			this._yArr = yy.split(",");
			this._drawGrid();
		}

		private _drawGrid() {
			for(var k = 0; k < this._gridArr.length; k++) {
				this._gridArr[k].v.removeEventListener(lxl.CEvent.PRE_CLICK, this._gridPreClickHandler, this);
				this._gridArr[k].v.dispose();
			}
			this.group.removeChildren();
			this._gridArr = [];
			let grid:Grid;
			for(var i = 0; i < this._xArr.length; i++) {
				for(var j = 0; j < this._yArr.length; j++) {
					grid = new Grid();
					grid.logicPos = (i + 1) + "_" + (j + 1);
					this.group.addChild(grid);
					if(i == 0 && j == 0) {
						grid.setBorderInVisible("left,top");
					} else if(i == 0 && j == this._yArr.length - 1) {
						grid.setBorderInVisible("bottom,left");
					} else if(i == this._xArr.length - 1 && j == 0) {
						grid.setBorderInVisible("right,top");
					} else if(i == this._xArr.length - 1 && j == this._yArr.length - 1) {
						grid.setBorderInVisible("bottom,right");
					} else if(i == 0) {
						grid.setBorderInVisible("left");
					} else if(j == 0) {
						grid.setBorderInVisible("top");
					} else if(i == this._xArr.length - 1) {
						grid.setBorderInVisible("right");
					} else if(j == this._yArr.length - 1) {
						grid.setBorderInVisible("bottom");
					} else {
						grid.setBorderInVisible("");
					}
					let map:lxl.data.Map = new lxl.data.Map();
					map.k = grid.logicPos;
					map.v = grid;
					lxl.Tool.setMapValue(this._gridArr, map);
					
					map.v.addEventListener(lxl.CEvent.PRE_CLICK, this._gridPreClickHandler, this);
				}
			}
		}

		private lastGrid:Grid;
		private lastGrids:Array<Grid> = [];
		private _gridPreClickHandler(e:lxl.CEvent):void {
			if(Qipan.readOnly == true)
				return;
			let gm:GridMap = (e.param.data as GridMap);
			if(lxl.Tool.getValueByKey(this._gridArr, (gm.loc_x + "_" + gm.loc_y)).filled == true)
				return;
			let info = lxl.Tool.callJS("getInfoToken");
			info._userRole == "COORDINATOR" ? (e.param as Grid).setChessType("attacker") : (e.param as Grid).setChessType("defender");
			this._qiziSound.play(0, 1);
			Qipan.dataHandler.chessMove((e.param as Grid).data);
		}

		private _chessMove(e:lxl.CEvent) {
			let gm:GridMap = (e.param as GridMap);
			lxl.Tool.getValueByKey(this._gridArr, (gm.loc_x + "_" + gm.loc_y)).setChessType(gm.chessType);
			lxl.Tool.getValueByKey(this._gridArr, (gm.loc_x + "_" + gm.loc_y)).setFilled(true);
			let result:string = Qipan.judgeWhoWin(this._gridArr);
			if(result != "" && result != undefined) {
				if(result == "attacker")
					this._showWin(Qipan.viewData.attackerToken);
				else if(result == "defender")
					this._showWin(Qipan.viewData.defenderToken);
			}
		}

		private _showWin(token:string) {
			egret.Tween.get(this)
				.wait(1000)
				.call(function () {
					this._win = new DlgWin();
					for(let i = 0; i < Qipan.userList.length; i++){
						if(Qipan.userList[i].token == token) {
							this._win.setLab(Qipan.userList[i].userName + "获胜");
							break;
						}
					}
					this.pop(this._win);
					this._win.addEventListener(lxl.CEvent.CLOSE, this._winClose, this);
				}, this);
		}

		private _win:app.DlgWin;
		private _winClose() {
			this._win.removeEventListener(lxl.CEvent.CLOSE, this._winClose, this);
			this._win.dispose();
			this._drawGrid();
			
		}

		dispose() {
			super.dispose();
			for(let i = 0; i < this.scrollGroup.numChildren; i++) {
				this.svList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickItemHandler, this);
			}
			for(var k = 0; k < this._gridArr.length; k++)
				this._gridArr[k].v.removeEventListener(lxl.CEvent.CLICK, this._gridPreClickHandler, this);
			this.group.removeChildren();
		}
	}
}