var Res = lxl.GlobalData.getInstance().resManager;
var Qipan = app.QipanManager.getInstance();
class Main extends lxl.Application {
    
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected start(): void {
        super.start();
        this.root = new app.QipanSence();
        lxl.GlobalData.getInstance().root = this;
        this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        this.stage.orientation = egret.OrientationMode.LANDSCAPE;
    }

    private static instance:Main;
    public static getInstance():Main {
        if(this.instance == null)
            this.instance = new Main();
        return this.instance;
    }
}
