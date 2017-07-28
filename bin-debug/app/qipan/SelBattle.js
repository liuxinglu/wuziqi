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
    var SelBattle = (function (_super) {
        __extends(SelBattle, _super);
        function SelBattle() {
            return _super.call(this, lxl.Config.SKIN_PATH + "SelBattle.exml") || this;
        }
        SelBattle.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.btn_home.addEventListener(lxl.CEvent.CLICK, this._homeHandler, this);
            this.btn_help.addEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
            this.btn_huyan.addEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
            this.btn_zhishi.addEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
            this.btn_lv1.addEventListener(lxl.CEvent.CLICK, this._lvHandler, this);
            this.btn_lv2.addEventListener(lxl.CEvent.CLICK, this._lvHandler, this);
            this._sound = Res.getRes("click_guanqia_mp3");
            var shape;
            shape = new egret.Shape();
            shape.graphics.beginFill(0x000000, 0.4);
            shape.graphics.drawRect(0, 0, this.width, this.height);
            shape.graphics.endFill();
            this.addChildAt(shape, 0);
        };
        SelBattle.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.btn_home.removeEventListener(lxl.CEvent.CLICK, this._homeHandler, this);
            this.btn_help.removeEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
            this.btn_huyan.removeEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
            this.btn_zhishi.removeEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
            this.btn_lv1.removeEventListener(lxl.CEvent.CLICK, this._lvHandler, this);
            this.btn_lv2.removeEventListener(lxl.CEvent.CLICK, this._lvHandler, this);
        };
        SelBattle.prototype._lvHandler = function (e) {
            if (e.currentTarget == this.btn_lv1) {
                app.QipanManager.getInstance().model = 1;
            }
            else if (e.currentTarget == this.btn_lv2) {
                app.QipanManager.getInstance().model = 2;
            }
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.SEL_COMPLETE));
        };
        SelBattle.prototype._huyanHandler = function (e) {
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.EYE_CHANGE));
        };
        SelBattle.prototype._changeEyeState = function (e) {
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
        };
        SelBattle.prototype._helpHandler = function (e) {
            this._help = new app.DlgHelp();
            this.pop(this._help);
            this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_zhishi.touchEnabled = false;
            this._help.addEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
        };
        SelBattle.prototype.helpClose = function () {
            this._help.removeEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
            this._help.dispose();
            this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_zhishi.touchEnabled = true;
        };
        SelBattle.prototype._knowledgeHandler = function (e) {
            this._zhishi = new app.DlgZhishi();
            this.pop(this._zhishi);
            this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_zhishi.touchEnabled = false;
            this._zhishi.addEventListener(lxl.CEvent.CLOSE, this.zhishiClose, this);
        };
        SelBattle.prototype.zhishiClose = function () {
            this._zhishi.removeEventListener(lxl.CEvent.CLOSE, this.zhishiClose, this);
            this._zhishi.dispose();
            this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_zhishi.touchEnabled = true;
        };
        SelBattle.prototype._homeHandler = function (e) {
            this.dispose();
        };
        return SelBattle;
    }(lxl.CComponent));
    app.SelBattle = SelBattle;
    __reflect(SelBattle.prototype, "app.SelBattle");
})(app || (app = {}));
//# sourceMappingURL=SelBattle.js.map