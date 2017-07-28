module app {
	export class QipanSence extends lxl.ui.CLayer{
		public constructor() {
			super();
		}

		onActivity():void {
			super.onActivity();
			let main:MainGrid = new app.MainGrid();
			main.width = this.stage.stageWidth;
			main.height = this.stage.stageHeight;
			main.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, ()=>{
				this.addChild(main);
			}, this);
		}
	}
}