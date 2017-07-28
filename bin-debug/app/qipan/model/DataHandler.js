var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var DataHandler = (function () {
        function DataHandler() {
        }
        DataHandler.prototype.sendMessageToServer = function (vd) {
            var tempvd = lxl.Tool.copyObject(vd);
            var o = { action: 'publicMessage', data: tempvd };
            lxl.Tool.callJS("sendMsg", o);
        };
        /**
         * 由老师端设置用户列表 然后学生端通过getUserList获取
         */
        DataHandler.prototype.setUserList = function (arr) {
            var tempArr = lxl.Tool.copyObject(arr);
            var obj = { type: 'getUserList', data: tempArr };
            this.sendMessageToServer(obj);
        };
        DataHandler.prototype.selDefender = function (token) {
            var obj = { type: 'selDefender', data: token };
            this.sendMessageToServer(obj);
        };
        DataHandler.prototype.chessMove = function (gridData) {
            var gd = lxl.Tool.copyObject(gridData);
            var obj = { type: 'chessMove', data: gd };
            this.sendMessageToServer(obj);
        };
        DataHandler.prototype._getUserList = function (data) {
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.GET_USER_LIST, data));
        };
        DataHandler.prototype._getDefender = function (data) {
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SEL_DEFENDER, data));
        };
        DataHandler.prototype._getChessMove = function (data) {
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.CHESS_MOVE, data));
        };
        DataHandler.prototype.getMessageFromServer = function (data) {
            lxl.logs.log("getMessageFromServer " + data);
            switch (data.type) {
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
        };
        DataHandler.prototype.setStudentsFromServer = function (data) {
            lxl.logs.log("students:" + data);
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.GET_STUDENTS_FROM_SERVER, data));
        };
        DataHandler.prototype.setTeacherFromServer = function (data) {
            lxl.logs.log("teacher:" + data);
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.GET_TEACHER_FROM_SERVER, data));
        };
        DataHandler.prototype.getWordsFromServer = function () {
        };
        return DataHandler;
    }());
    app.DataHandler = DataHandler;
    __reflect(DataHandler.prototype, "app.DataHandler");
})(app || (app = {}));
//# sourceMappingURL=DataHandler.js.map