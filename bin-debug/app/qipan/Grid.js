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
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid() {
            var _this = _super.call(this) || this;
            _this._logicPos = "";
            _this._filled = false;
            _this._posArr = [];
            _this._data = new app.GridMap();
            return _this;
            // super("resource/eui_skins/GridSkin.exmls");
        }
        Grid.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.width = lxl.Config.GRID_SIZE;
            this.height = lxl.Config.GRID_SIZE;
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            this._shape2 = new egret.Shape();
            this._shape = new egret.Shape();
            this._shape.width = this._shape2.width = this.width;
            this._shape.height = this._shape2.height = this.height;
            this._shape.anchorOffsetX = this._shape2.anchorOffsetX = this.width / 2;
            this._shape.anchorOffsetY = this._shape2.anchorOffsetY = this.height / 2;
            this._lab = new eui.Label();
            this._lab.size = 18;
            this._lab.textColor = 0x000000;
            this.addChild(this._lab);
            this.addChild(this._shape2);
            this.addChild(this._shape);
            this._img = new eui.Image("black_png");
            this._img.x = this._img.y = 0;
            this._img.width = lxl.Config.GRID_SIZE - 3;
            this._img.height = lxl.Config.GRID_SIZE - 3;
            this._img.anchorOffsetX = this._img.anchorOffsetY = this.width / 2;
            this._img.visible = false;
            this.addChild(this._img);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
        };
        Object.defineProperty(Grid.prototype, "logicPos", {
            get: function () {
                return this._logicPos;
            },
            set: function (str) {
                this._logicPos = str;
                var posArr = str.split("_");
                this._posArr = posArr;
                this.x = parseInt(posArr[0]) * lxl.Config.GRID_SIZE;
                this.y = parseInt(posArr[1]) * lxl.Config.GRID_SIZE;
                this._data.loc_x = parseInt(posArr[0]);
                this._data.loc_y = parseInt(posArr[1]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "data", {
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        Grid.prototype.setChessType = function (type) {
            this._data.chessType = type;
            if (type == "attacker") {
                this._img.source = "black_png";
            }
            else if (type == "defender") {
                this._img.source = "white_png";
            }
            this._img.visible = false;
        };
        Grid.prototype._clickHandler = function (e) {
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.PRE_CLICK, this));
            // if(this.filled == false) {
            // 	this.setFilled(true);
            // 	this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLICK, this));
            // }
            // else {
            // 	//可以加点特效
            // }
        };
        Grid.prototype.setBorderInVisible = function (dir) {
            this._shape2.graphics.lineStyle(5, 0);
            switch (dir) {
                case "top":
                    this._shape2.graphics.moveTo(0, this.height / 2);
                    this._shape2.graphics.lineTo(this.width, this.height / 2);
                    this._shape2.graphics.endFill();
                    this._shape2.graphics.lineStyle(2, 0);
                    this._shape2.graphics.moveTo(this.width / 2, this.height / 2);
                    this._shape2.graphics.lineTo(this.width / 2, this.height);
                    if (this._posArr[1] == "1") {
                        this._lab.y = -30;
                        this._lab.x = -5;
                        this._lab.text = String.fromCharCode(65 + parseInt(this._posArr[0]) - 1);
                    }
                    break;
                case "left":
                    this._shape2.graphics.lineStyle(5, 0);
                    this._shape2.graphics.moveTo(this.width / 2, 0);
                    this._shape2.graphics.lineTo(this.width / 2, this.height);
                    this._shape2.graphics.endFill();
                    this._shape2.graphics.lineStyle(2, 0);
                    this._shape2.graphics.moveTo(this.width / 2, this.height / 2);
                    this._shape2.graphics.lineTo(this.width, this.height / 2);
                    if (this._posArr[0] == "1") {
                        this._lab.y = -6;
                        this._lab.x = -35;
                        this._lab.text = this._posArr[1];
                    }
                    break;
                case "right":
                    this._shape2.graphics.moveTo(this.width / 2, 0);
                    this._shape2.graphics.lineTo(this.width / 2, this.height);
                    this._shape2.graphics.endFill();
                    this._shape2.graphics.lineStyle(2, 0);
                    this._shape2.graphics.moveTo(this.width / 2, this.height / 2);
                    this._shape2.graphics.lineTo(0, this.height / 2);
                    break;
                case "bottom":
                    this._shape2.graphics.moveTo(0, this.height / 2);
                    this._shape2.graphics.lineTo(this.width, this.height / 2);
                    this._shape2.graphics.endFill();
                    this._shape2.graphics.lineStyle(2, 0);
                    this._shape2.graphics.moveTo(this.width / 2, 0);
                    this._shape2.graphics.lineTo(this.width / 2, this.height / 2);
                    break;
                case "top,left":
                case "left,top":
                    this._shape2.graphics.moveTo(this.width / 2, this.height);
                    this._shape2.graphics.lineTo(this.width / 2, this.height / 2);
                    this._shape2.graphics.lineTo(this.width, this.height / 2);
                    if (this._posArr[1] == "1") {
                        this._lab.y = -30;
                        this._lab.text = String.fromCharCode(65 + parseInt(this._posArr[0]) - 1);
                        this._lab2 = new eui.Label();
                        this._lab2.y = -6;
                        this._lab2.x = -35;
                        this._lab2.size = 18;
                        this._lab2.textColor = 0x000000;
                        this.addChild(this._lab2);
                        this._lab2.text = this._posArr[1];
                    }
                    break;
                case "top,right":
                case "right,top":
                    this._shape2.graphics.moveTo(this.width / 2, this.height);
                    this._shape2.graphics.lineTo(this.width / 2, this.height / 2);
                    this._shape2.graphics.lineTo(0, this.height / 2);
                    if (this._posArr[1] == "1") {
                        this._lab.y = -30;
                        this._lab.text = String.fromCharCode(65 + parseInt(this._posArr[0]) - 1);
                    }
                    break;
                case "bottom,left":
                case "left,bottom":
                    this._shape2.graphics.moveTo(this.width / 2, 0);
                    this._shape2.graphics.lineTo(this.width / 2, this.height / 2);
                    this._shape2.graphics.lineTo(this.width, this.height / 2);
                    if (this._posArr[0] == "1") {
                        this._lab.y = -6;
                        this._lab.x = -35;
                        this._lab.text = this._posArr[1];
                    }
                    break;
                case "bottom,right":
                case "right,bottom":
                    this._shape2.graphics.moveTo(this.width / 2, 0);
                    this._shape2.graphics.lineTo(this.width / 2, this.height / 2);
                    this._shape2.graphics.lineTo(0, this.height / 2);
                    break;
                default:
                    this._shape2.graphics.lineStyle(2, 0);
                    this._shape2.graphics.moveTo(this.width / 2, 0);
                    this._shape2.graphics.lineTo(this.width / 2, this.height);
                    this._shape2.graphics.moveTo(0, this.height / 2);
                    this._shape2.graphics.lineTo(this.width, this.height / 2);
            }
            this._shape2.graphics.endFill();
        };
        Object.defineProperty(Grid.prototype, "filled", {
            get: function () {
                return this._filled;
            },
            enumerable: true,
            configurable: true
        });
        Grid.prototype.setFilled = function (b, ani) {
            if (ani === void 0) { ani = true; }
            if (b == false) {
                this._img.visible = false;
                this._filled = false;
            }
            else {
                // this._shape.graphics.beginFill(0xff0000);
                // this._shape.graphics.drawCircle(this.width / 2, this.height / 2, (this.width / 2) - 5);
                // this._shape.graphics.endFill();
                this._img.visible = true;
                if (ani == true) {
                    egret.Tween.get(this._img)
                        .to({ alpha: 0 }, 200, egret.Ease.quintIn)
                        .to({ alpha: 1 }, 500, egret.Ease.quintOut);
                }
                this._filled = true;
            }
        };
        Grid.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._logicPos = "";
            this._lab.text = "";
            this._filled = false;
            this._img.visible = false;
            this._posArr = [];
            this._data = new app.GridMap();
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
        };
        return Grid;
    }(lxl.ui.CLayer));
    app.Grid = Grid;
    __reflect(Grid.prototype, "app.Grid");
})(app || (app = {}));
//# sourceMappingURL=Grid.js.map