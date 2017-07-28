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
    var MainGrid = (function (_super) {
        __extends(MainGrid, _super);
        function MainGrid() {
            return _super.call(this, lxl.Config.SKIN_PATH + "MainGrid.exml") || this;
        }
        MainGrid.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.btn_help.addEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
            this.btn_huyan.addEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
            this.btn_knowledge.addEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
            this.btn_shuoming.addEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
            this.btn_zhishi.addEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
            this.btn_start.addEventListener(lxl.CEvent.CLICK, this._startHandler, this);
            var info = lxl.Tool.callJS("getInfoToken");
            if (info._userRole == "COORDINATOR") {
                Qipan.viewData.type = "showFrist";
                Qipan.viewData.gameIndex = 2;
                Qipan.dataHandler.sendMessageToServer(Qipan.viewData);
            }
            lxl.Tool.callJS("loadGameComplete");
        };
        MainGrid.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.btn_help.removeEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
            this.btn_huyan.removeEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
            this.btn_knowledge.removeEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
            this.btn_shuoming.removeEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
            this.btn_zhishi.removeEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
            this.btn_start.removeEventListener(lxl.CEvent.CLICK, this._startHandler, this);
        };
        MainGrid.prototype._startHandler = function (e) {
            var _this = this;
            // this._sel = new SelBattle();
            // this.pop(this._sel);
            // this._sel.once(lxl.CEvent.SEL_COMPLETE, this._lvHandler,this);
            this.group_model.visible = false;
            var view = new app.TeachWatchView();
            view.once(lxl.CEvent.LOAD_SKIN_COMPLETE, function () {
                _this.addChild(view);
            }, this);
        };
        MainGrid.prototype._lvHandler = function (e) {
            this._sel.dispose();
            this.group_model.visible = false;
            var teach;
        };
        MainGrid.prototype._helpHandler = function (e) {
            this._help = new app.DlgHelp();
            this.pop(this._help);
            this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = false;
            this._help.addEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
        };
        MainGrid.prototype.helpClose = function () {
            this._help.removeEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
            this._help.dispose();
            this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = true;
        };
        MainGrid.prototype._huyanHandler = function (e) {
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.EYE_CHANGE));
        };
        MainGrid.prototype._changeEyeState = function (e) {
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
        };
        MainGrid.prototype._knowledgeHandler = function (e) {
            this._zhishi = new app.DlgZhishi();
            this.pop(this._zhishi);
            this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = false;
            this._zhishi.addEventListener(lxl.CEvent.CLOSE, this.zhishiClose, this);
        };
        MainGrid.prototype.zhishiClose = function () {
            this._zhishi.removeEventListener(lxl.CEvent.CLOSE, this.zhishiClose, this);
            this._zhishi.dispose();
            this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = true;
        };
        MainGrid.prototype._backHandler = function (e) {
            this.btn_knowledge.visible = this.btn_help.visible = false;
            this.group_model.visible = true;
        };
        return MainGrid;
    }(lxl.CComponent));
    app.MainGrid = MainGrid;
    __reflect(MainGrid.prototype, "app.MainGrid");
})(app || (app = {}));
//# sourceMappingURL=MainGrid.js.map