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
    var DlgZhishi = (function (_super) {
        __extends(DlgZhishi, _super);
        function DlgZhishi() {
            return _super.call(this, lxl.Config.SKIN_PATH + "DlgZhishiSkin.exml") || this;
        }
        DlgZhishi.prototype.onActivity = function () {
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
        DlgZhishi.prototype._closeHandler = function (e) {
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE));
        };
        DlgZhishi.prototype._huyanHandler = function (e) {
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.EYE_CHANGE));
        };
        DlgZhishi.prototype._changeEyeState = function (e) {
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
        };
        DlgZhishi.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.btn_huyan.removeEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
            this.btn_close.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
        };
        return DlgZhishi;
    }(lxl.CComponent));
    app.DlgZhishi = DlgZhishi;
    __reflect(DlgZhishi.prototype, "app.DlgZhishi");
})(app || (app = {}));
//# sourceMappingURL=DlgZhishi.js.map