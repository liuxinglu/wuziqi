var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var GridMap = (function () {
        function GridMap() {
        }
        return GridMap;
    }());
    app.GridMap = GridMap;
    __reflect(GridMap.prototype, "app.GridMap");
    var UserInfo = (function () {
        function UserInfo() {
            this.userName = "";
            this.token = "";
            this.userType = ""; //用户类型 teacher student
            this.chessType = "";
            this.gridMap = []; //当前用户行棋格子
            this.studentInfo = {}; //当前用户的信息
            this.isWin = 0;
        }
        return UserInfo;
    }());
    app.UserInfo = UserInfo;
    __reflect(UserInfo.prototype, "app.UserInfo");
    var ViewData = (function () {
        function ViewData() {
            this.type = ""; //show normal
            this.gameIndex = 0;
            this.attackerToken = ""; //先手
            this.defenderToken = ""; //后手
            this.curRole = ""; //轮到谁下 attacker defender
            this.userList = [];
        }
        ViewData.prototype.dispose = function () {
            this.type = "";
            this.attackerToken = "";
            this.defenderToken = "";
            this.userList = [];
        };
        return ViewData;
    }());
    app.ViewData = ViewData;
    __reflect(ViewData.prototype, "app.ViewData");
})(app || (app = {}));
//# sourceMappingURL=ViewData.js.map