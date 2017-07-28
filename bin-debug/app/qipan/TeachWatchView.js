var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var TeachWatchView = (function (_super) {
        __extends(TeachWatchView, _super);
        function TeachWatchView() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "TeacherWatchViewSkin.exml") || this;
            _this._gridArr = [];
            _this._lock = false;
            _this.svList = [];
            _this.arrQipanParts = [];
            _this._curTimes = 0;
            _this._maxTimes = 4;
            _this._eachTimes = 3;
            _this.lastGrids = [];
            return _this;
        }
        TeachWatchView.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this._qiziSound = Res.getRes("qizi_mp3");
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.GET_LIST, this._updateStudentList, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.SEL_DEFENDER_COMPLETE, this._updateUserListState, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.CHESS_MOVE, this._chessMove, this);
            this._updateStudentList(null);
        };
        TeachWatchView.prototype._updateUserListState = function (e) {
            for (var i = 0; i < this.scrollGroup.numChildren; i++) {
                if (this.scrollGroup.getChildAt(i)) {
                    if (this.scrollGroup.getChildAt(i).data.token == Qipan.viewData.defenderToken) {
                        this.scrollGroup.getChildAt(i).data.chessType = "defender";
                        this.scrollGroup.getChildAt(i).setActivity();
                    }
                    else {
                        this.scrollGroup.getChildAt(i).data.chessType = "";
                        this.scrollGroup.getChildAt(i).unActivity();
                    }
                }
            }
            var xx = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14";
            var yy = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14";
            this.setXY(xx, yy);
        };
        TeachWatchView.prototype._updateStudentList = function (e) {
            var _this = this;
            var sv;
            for (var i = 0; i < Qipan.userList.length; i++) {
                if (Qipan.userList[i].userType == "student") {
                    sv = new app.StudentItemView();
                    sv.name = Qipan.userList[i].token;
                    sv.data = Qipan.userList[i];
                    sv.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, function () {
                        sv.updateData();
                        _this.svList.push(sv);
                        if (_this.scrollGroup.getChildByName(_this.svList[_this.svList.length - 1].name))
                            _this.scrollGroup.getChildByName(_this.svList[_this.svList.length - 1].name).updateData();
                        else {
                            _this.scrollGroup.addChild(_this.svList[_this.svList.length - 1]);
                            _this.svList[_this.svList.length - 1].addEventListener(egret.TouchEvent.TOUCH_TAP, _this._clickItemHandler, _this);
                        }
                    }, this);
                }
            }
        };
        TeachWatchView.prototype._clickItemHandler = function (e) {
            var vd = e.currentTarget.data;
            Qipan.dataHandler.selDefender(vd.token);
        };
        TeachWatchView.prototype.setXY = function (xx, yy) {
            this._xArr = xx.split(",");
            this._yArr = yy.split(",");
            this._drawGrid();
        };
        TeachWatchView.prototype._drawGrid = function () {
            for (var k = 0; k < this._gridArr.length; k++) {
                this._gridArr[k].v.removeEventListener(lxl.CEvent.PRE_CLICK, this._gridPreClickHandler, this);
                this._gridArr[k].v.dispose();
            }
            this.group.removeChildren();
            this._gridArr = [];
            var grid;
            for (var i = 0; i < this._xArr.length; i++) {
                for (var j = 0; j < this._yArr.length; j++) {
                    grid = new app.Grid();
                    grid.logicPos = (i + 1) + "_" + (j + 1);
                    this.group.addChild(grid);
                    if (i == 0 && j == 0) {
                        grid.setBorderInVisible("left,top");
                    }
                    else if (i == 0 && j == this._yArr.length - 1) {
                        grid.setBorderInVisible("bottom,left");
                    }
                    else if (i == this._xArr.length - 1 && j == 0) {
                        grid.setBorderInVisible("right,top");
                    }
                    else if (i == this._xArr.length - 1 && j == this._yArr.length - 1) {
                        grid.setBorderInVisible("bottom,right");
                    }
                    else if (i == 0) {
                        grid.setBorderInVisible("left");
                    }
                    else if (j == 0) {
                        grid.setBorderInVisible("top");
                    }
                    else if (i == this._xArr.length - 1) {
                        grid.setBorderInVisible("right");
                    }
                    else if (j == this._yArr.length - 1) {
                        grid.setBorderInVisible("bottom");
                    }
                    else {
                        grid.setBorderInVisible("");
                    }
                    var map = new lxl.data.Map();
                    map.k = grid.logicPos;
                    map.v = grid;
                    lxl.Tool.setMapValue(this._gridArr, map);
                    map.v.addEventListener(lxl.CEvent.PRE_CLICK, this._gridPreClickHandler, this);
                }
            }
        };
        TeachWatchView.prototype._gridPreClickHandler = function (e) {
            if (Qipan.readOnly == true)
                return;
            var gm = e.param.data;
            if (lxl.Tool.getValueByKey(this._gridArr, (gm.loc_x + "_" + gm.loc_y)).filled == true)
                return;
            var info = lxl.Tool.callJS("getInfoToken");
            info._userRole == "COORDINATOR" ? e.param.setChessType("attacker") : e.param.setChessType("defender");
            this._qiziSound.play(0, 1);
            Qipan.dataHandler.chessMove(e.param.data);
        };
        TeachWatchView.prototype._chessMove = function (e) {
            var gm = e.param;
            lxl.Tool.getValueByKey(this._gridArr, (gm.loc_x + "_" + gm.loc_y)).setChessType(gm.chessType);
            lxl.Tool.getValueByKey(this._gridArr, (gm.loc_x + "_" + gm.loc_y)).setFilled(true);
            var result = Qipan.judgeWhoWin(this._gridArr);
            if (result != "" && result != undefined) {
                if (result == "attacker")
                    this._showWin(Qipan.viewData.attackerToken);
                else if (result == "defender")
                    this._showWin(Qipan.viewData.defenderToken);
            }
        };
        TeachWatchView.prototype._showWin = function (token) {
            egret.Tween.get(this)
                .wait(1000)
                .call(function () {
                this._win = new app.DlgWin();
                for (var i = 0; i < Qipan.userList.length; i++) {
                    if (Qipan.userList[i].token == token) {
                        this._win.setLab(Qipan.userList[i].userName + "获胜");
                        break;
                    }
                }
                this.pop(this._win);
                this._win.addEventListener(lxl.CEvent.CLOSE, this._winClose, this);
            }, this);
        };
        TeachWatchView.prototype._winClose = function () {
            this._win.removeEventListener(lxl.CEvent.CLOSE, this._winClose, this);
            this._win.dispose();
            this._drawGrid();
        };
        TeachWatchView.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            for (var i = 0; i < this.scrollGroup.numChildren; i++) {
                this.svList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickItemHandler, this);
            }
            for (var k = 0; k < this._gridArr.length; k++)
                this._gridArr[k].v.removeEventListener(lxl.CEvent.CLICK, this._gridPreClickHandler, this);
            this.group.removeChildren();
        };
        return TeachWatchView;
    }(lxl.CComponent));
    app.TeachWatchView = TeachWatchView;
    __reflect(TeachWatchView.prototype, "app.TeachWatchView");
})(app || (app = {}));
//# sourceMappingURL=TeachWatchView.js.map