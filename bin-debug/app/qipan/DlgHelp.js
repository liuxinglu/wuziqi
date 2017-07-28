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
    var DlgHelp = (function (_super) {
        __extends(DlgHelp, _super);
        function DlgHelp() {
            return _super.call(this, lxl.Config.SKIN_PATH + "DlgHelpSkin.exml") || this;
        }
        DlgHelp.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            var shape;
            shape = new egret.Shape();
            shape.graphics.beginFill(0x000000, 0.4);
            shape.graphics.drawRect(0, 0, this.width, this.height);
            shape.graphics.endFill();
            this.addChildAt(shape, 0);
            this.btn_huyan.addEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
            this.btn_close.addEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
        };
        DlgHelp.prototype._closeHandler = function (e) {
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE));
        };
        DlgHelp.prototype._huyanHandler = function (e) {
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.EYE_CHANGE));
        };
        DlgHelp.prototype._changeEyeState = function (e) {
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
        };
        DlgHelp.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.btn_huyan.removeEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
            this.btn_close.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
        };
        return DlgHelp;
    }(lxl.CComponent));
    app.DlgHelp = DlgHelp;
    __reflect(DlgHelp.prototype, "app.DlgHelp");
})(app || (app = {}));
//# sourceMappingURL=DlgHelp.js.map