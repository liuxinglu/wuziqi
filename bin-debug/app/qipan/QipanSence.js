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
    var QipanSence = (function (_super) {
        __extends(QipanSence, _super);
        function QipanSence() {
            return _super.call(this) || this;
        }
        QipanSence.prototype.onActivity = function () {
            var _this = this;
            _super.prototype.onActivity.call(this);
            var main = new app.MainGrid();
            main.width = this.stage.stageWidth;
            main.height = this.stage.stageHeight;
            main.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, function () {
                _this.addChild(main);
            }, this);
        };
        return QipanSence;
    }(lxl.ui.CLayer));
    app.QipanSence = QipanSence;
    __reflect(QipanSence.prototype, "app.QipanSence");
})(app || (app = {}));
//# sourceMappingURL=QipanSence.js.map