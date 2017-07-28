var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var QipanManager = (function () {
        function QipanManager() {
            this.model = 0; //0 1 2 初中高
            this.userList = [];
            this.readOnly = true;
            this.viewData = new app.ViewData();
            this.dataHandler = new app.DataHandler();
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.GET_STUDENTS_FROM_SERVER, this._getStudents, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.GET_USER_LIST, this._userListHandler, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.SEL_DEFENDER, this._selDefender, this);
        }
        QipanManager.prototype._selDefender = function (e) {
            this.viewData.defenderToken = e.param;
            this.viewData.curRole = "attacker";
            var info = lxl.Tool.callJS("getInfoToken");
            if (info._userRole == "COORDINATOR") {
                this.readOnly = false;
            }
            else {
                if (info.loginToken == e.param) {
                    this.readOnly = false;
                }
                else {
                    this.readOnly = true;
                }
            }
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SEL_DEFENDER_COMPLETE));
        };
        QipanManager.prototype._userListHandler = function (e) {
            this.userList = lxl.Tool.objectToArray(e.param);
            this.viewData.userList = this.userList;
            for (var i = 0; i < this.userList.length; i++) {
                if (this.userList[i].userType == "teacher") {
                    this.viewData.curRole = "attacker";
                    this.viewData.attackerToken = this.userList[i].token;
                    break;
                }
            }
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.GET_LIST));
        };
        QipanManager.prototype._getStudents = function (e) {
            var info = lxl.Tool.callJS("getInfoToken");
            if (info._userRole == "COORDINATOR") {
                var vd = void 0;
                for (var i = 0; i < e.param.length; i++) {
                    vd = new app.UserInfo();
                    vd.userType = "student";
                    vd.token = e.param[i].loginToken;
                    vd.studentInfo = e.param[i];
                    vd.userName = e.param[i].info.userName;
                    this.userList.push(vd);
                }
                vd = new app.UserInfo();
                vd.userType = "teacher";
                vd.token = info.loginToken;
                vd.chessType = "attacker";
                vd.userName = info.userName;
                this.userList.push(vd);
                this.dataHandler.setUserList(this.userList);
            }
        };
        QipanManager.prototype.judgeWhoWin = function (gridArr) {
            var countArr = [{ count: 1, type: "" }, { count: 1, type: "" }, { count: 1, type: "" }, { count: 1, type: "" }];
            for (var i = 1; i < 16; i++) {
                for (var j = 1; j < 16; j++) {
                    var g1 = lxl.Tool.getValueByKey(gridArr, i + "_" + j);
                    var g2 = lxl.Tool.getValueByKey(gridArr, i + "_" + (j + 1));
                    if (g2 != null) {
                        if (g1.data.chessType == g2.data.chessType && g1.data.chessType != undefined) {
                            countArr[0].count++;
                            countArr[0].type = g1.data.chessType;
                            if (countArr[0].count == 4)
                                return countArr[0].type;
                        }
                        else {
                            countArr[0].count = 0;
                        }
                    }
                    else
                        break;
                }
                for (var k = 1; k < 16; k++) {
                    var g1 = lxl.Tool.getValueByKey(gridArr, k + "_" + i);
                    var g2 = lxl.Tool.getValueByKey(gridArr, (k + 1) + "_" + i);
                    if (g2 != null) {
                        if (g1.data.chessType == g2.data.chessType && g1.data.chessType != undefined) {
                            countArr[1].count++;
                            countArr[1].type = g1.data.chessType;
                            if (countArr[1].count == 4)
                                return countArr[1].type;
                        }
                        else {
                            countArr[1].count = 0;
                        }
                    }
                    else
                        break;
                }
            }
            for (var i = 0; i < 15; i++) {
                var tempi = i;
                for (var j = 0; j < 15; j++) {
                    var g1 = lxl.Tool.getValueByKey(gridArr, (i + 1) + "_" + (j + 1));
                    var g2 = lxl.Tool.getValueByKey(gridArr, (i + 2) + "_" + (j + 2));
                    if (g2 != null) {
                        if (g1.data.chessType == g2.data.chessType && g1.data.chessType != undefined) {
                            countArr[2].count++;
                            countArr[2].type = g1.data.chessType;
                            i++;
                            if (countArr[2].count == 4)
                                return countArr[2].type;
                        }
                        else {
                            countArr[2].count = 0;
                        }
                    }
                    else {
                        i = tempi;
                        break;
                    }
                }
            }
            for (var j = 14; j > 0; j--) {
                var tempj = j;
                for (var i = 0; i < 15; i++) {
                    var g1 = lxl.Tool.getValueByKey(gridArr, (i + 1) + "_" + j);
                    var g2 = lxl.Tool.getValueByKey(gridArr, (i + 2) + "_" + (j - 1));
                    if (g2 != null) {
                        if (g1.data.chessType == g2.data.chessType && g1.data.chessType != undefined) {
                            countArr[3].count++;
                            countArr[3].type = g1.data.chessType;
                            j--;
                            if (countArr[3].count == 4)
                                return countArr[3].type;
                        }
                        else {
                            countArr[3].count = 0;
                        }
                    }
                    else {
                        j = tempj;
                        break;
                    }
                }
            }
            for (var i = 0; i < countArr.length; i++) {
                if (countArr[i].count >= 4) {
                    return countArr[i].type;
                }
                else if (i == countArr.length - 1) {
                    return "";
                }
            }
        };
        QipanManager.prototype.findEmptyGrids = function (arr, grid) {
            for (var i = arr.length - 1; i >= 0; i--) {
                if (arr[i].logicPos == grid.logicPos) {
                    arr.splice(i, 1);
                    break;
                }
            }
        };
        /**
         * 返回通过grid来确定周围有count个空闲位置的数组
         */
        QipanManager.prototype.getEmptyGrid = function (arr, count) {
            var arrGrid = [];
            var arrCurPos = [];
            var cg = new app.Grid();
            for (var j = 0; j < arr.length; j++) {
                cg.logicPos = arr[j].logicPos;
                arrCurPos = cg.logicPos.split("_");
                for (var i = 0; i < arr.length; i++) {
                    var pos = arr[i].logicPos;
                    var arrPos = pos.split("_");
                    if ((arrPos[0] == arrCurPos[0] && (parseInt(arrPos[1]) == parseInt(arrCurPos[1]) + 1 || parseInt(arrPos[1]) == parseInt(arrCurPos[1]) - 1)) ||
                        (arrPos[1] == arrCurPos[1] && (parseInt(arrPos[0]) == parseInt(arrCurPos[0]) + 1 || parseInt(arrPos[0]) == parseInt(arrCurPos[0]) - 1))) {
                        var curpos = arr[i].logicPos.split("_");
                        for (var k = 0; k < arrGrid.length; k++) {
                            var pos2 = arrGrid[k].logicPos;
                            var arrPos2 = pos2.split("_");
                            if ((arrPos2[0] == curpos[0] && (parseInt(arrPos2[1]) == parseInt(curpos[1]) + 1 || parseInt(arrPos2[1]) == parseInt(curpos[1]) - 1)) ||
                                (arrPos2[1] == curpos[1] && (parseInt(arrPos2[0]) == parseInt(curpos[0]) + 1 || parseInt(arrPos2[0]) == parseInt(curpos[0]) - 1))) {
                                arrGrid.push(arr[i]);
                                break;
                            }
                        }
                        lxl.logs.log("cg.logicPos:" + cg.logicPos + " " + arr[i].logicPos);
                        if (arrGrid.length == 0)
                            arrGrid.push(arr[i]);
                        cg.logicPos = arr[i].logicPos;
                        arrCurPos = cg.logicPos.split("_");
                        if (arrGrid.length == count) {
                            lxl.logs.log("----");
                            return arrGrid;
                        }
                    }
                }
            }
            return [];
        };
        QipanManager.getInstance = function () {
            if (this._qipan == null)
                this._qipan = new QipanManager();
            return this._qipan;
        };
        return QipanManager;
    }());
    app.QipanManager = QipanManager;
    __reflect(QipanManager.prototype, "app.QipanManager");
})(app || (app = {}));
//# sourceMappingURL=QipanManager.js.map