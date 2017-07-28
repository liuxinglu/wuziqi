var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var Config = (function () {
        function Config() {
        }
        return Config;
    }());
    /**
     * 贪吃蛇的方向
     */
    Config.SNAKE_DIRECTION = "SnakeEvent::SnakeDirection";
    Config.SPEED1 = 300;
    Config.SPEED2 = 500;
    Config.SPEED3 = 800;
    app.Config = Config;
    __reflect(Config.prototype, "app.Config");
    /**
     * 贪吃蛇的方向
     */
    var SnakeDirection;
    (function (SnakeDirection) {
        SnakeDirection[SnakeDirection["Left"] = 0] = "Left";
        SnakeDirection[SnakeDirection["Right"] = 1] = "Right";
        SnakeDirection[SnakeDirection["Up"] = 2] = "Up";
        SnakeDirection[SnakeDirection["Down"] = 3] = "Down";
    })(SnakeDirection || (SnakeDirection = {}));
})(app || (app = {}));
//# sourceMappingURL=Config.js.map