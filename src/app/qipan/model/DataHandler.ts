module app {
	export class DataHandler{
		public constructor() {
		}

		public sendMessageToServer(vd:Object) {
			let tempvd = lxl.Tool.copyObject(vd);
			let o:Object = {action:'publicMessage', data:tempvd};
			lxl.Tool.callJS("sendMsg", o);
		}

		/**
		 * 由老师端设置用户列表 然后学生端通过getUserList获取
		 */
		public setUserList(arr:Array<UserInfo>) {
			let tempArr = lxl.Tool.copyObject(arr);
			let obj = {type:'getUserList', data:tempArr};
			this.sendMessageToServer(obj);
		}

		public selDefender(token:string) {
			let obj = {type:'selDefender', data:token};
			this.sendMessageToServer(obj);
		}

		public chessMove(gridData:GridMap) {
			let gd = lxl.Tool.copyObject(gridData);
			let obj = {type:'chessMove', data:gd};
			this.sendMessageToServer(obj);
		}

		private _getUserList(data:any) {
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.GET_USER_LIST, data))
		}

		private _getDefender(data:any) {
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SEL_DEFENDER, data));
		}

		private _getChessMove(data:any) {
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.CHESS_MOVE, data));
		}

		public getMessageFromServer(data:any) {
			lxl.logs.log("getMessageFromServer " + data);
			switch(data.type) {
				case "getUserList":
					this._getUserList(data.data);
				break;
				case "selDefender":
					this._getDefender(data.data);
				break;
				case "chessMove":
					this._getChessMove(data.data);
				break;
			}
		}

		public setStudentsFromServer(data:any) {
			lxl.logs.log("students:" + data);
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.GET_STUDENTS_FROM_SERVER, data));
		}

		public setTeacherFromServer(data:any) {
			lxl.logs.log("teacher:" + data);
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.GET_TEACHER_FROM_SERVER, data));
		}

		public getWordsFromServer() {

		}
	}
}