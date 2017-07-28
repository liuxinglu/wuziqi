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
    var StudentItemView = (function (_super) {
        __extends(StudentItemView, _super);
        function StudentItemView() {
            return _super.call(this, lxl.Config.SKIN_PATH + "StudentItemViewSkin.exml") || this;
        }
        Object.defineProperty(StudentItemView.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (d) {
                this._data = d;
            },
            enumerable: true,
            configurable: true
        });
        StudentItemView.prototype.updateData = function () {
            this.lab_name.text = this._data.userName;
        };
        StudentItemView.prototype.setActivity = function () {
            this.img_type.visible = true;
        };
        StudentItemView.prototype.unActivity = function () {
            this.img_type.visible = false;
        };
        StudentItemView.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
        };
        StudentItemView.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return StudentItemView;
    }(lxl.CComponent));
    app.StudentItemView = StudentItemView;
    __reflect(StudentItemView.prototype, "app.StudentItemView");
})(app || (app = {}));
//# sourceMappingURL=StudentItemView.js.map