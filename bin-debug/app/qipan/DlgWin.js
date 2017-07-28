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
    var DlgWin = (function (_super) {
        __extends(DlgWin, _super);
        function DlgWin() {
            return _super.call(this, lxl.Config.SKIN_PATH + "DlgWinSkin.exml") || this;
        }
        DlgWin.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            var shape;
            shape = new egret.Shape();
            shape.graphics.beginFill(0x000000, 0.4);
            shape.graphics.drawRect(0, 0, this.width, this.height);
            shape.graphics.endFill();
            this.addChildAt(shape, 0);
            this.btn_jixu.addEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
            this._sound = Res.getRes("win_mp3");
            this._sound.play(0, 1);
            this._sound1 = Res.getRes("click_guanqia_mp3");
            this.lab_desc.text = this._txt;
        };
        DlgWin.prototype.setLab = function (str) {
            this._txt = str;
        };
        DlgWin.prototype._closeHandler = function (e) {
            this._sound1.play(0, 1);
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE));
        };
        DlgWin.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.btn_jixu.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
        };
        return DlgWin;
    }(lxl.CComponent));
    app.DlgWin = DlgWin;
    __reflect(DlgWin.prototype, "app.DlgWin");
})(app || (app = {}));
//# sourceMappingURL=DlgWin.js.map