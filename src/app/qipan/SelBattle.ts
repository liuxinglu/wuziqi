module app {
	export class SelBattle extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "SelBattle.exml");
		}
		private btn_home:lxl.ui.CButton;
		private btn_help:lxl.ui.CButton;
		private btn_zhishi:lxl.ui.CButton;
		private btn_huyan:lxl.ui.CButton;
		private _sound:egret.Sound;
		private btn_lv1:lxl.ui.CButton;
		private btn_lv2:lxl.ui.CButton;
		

		onActivity() {
			super.onActivity();
			this.btn_home.addEventListener(lxl.CEvent.CLICK, this._homeHandler, this);
			this.btn_help.addEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
			this.btn_huyan.addEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
			this.btn_zhishi.addEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
			this.btn_lv1.addEventListener(lxl.CEvent.CLICK, this._lvHandler, this);
			this.btn_lv2.addEventListener(lxl.CEvent.CLICK, this._lvHandler, this);
			this._sound = Res.getRes("click_guanqia_mp3");
			let shape:egret.Shape;
			shape= new egret.Shape();
			shape.graphics.beginFill(0x000000, 0.4);
			shape.graphics.drawRect(0, 0, this.width, this.height);
			shape.graphics.endFill();
			this.addChildAt(shape, 0);
		}

		dispose() {
			super.dispose();
			this.btn_home.removeEventListener(lxl.CEvent.CLICK, this._homeHandler, this);
			this.btn_help.removeEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
			this.btn_huyan.removeEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
			this.btn_zhishi.removeEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
			this.btn_lv1.removeEventListener(lxl.CEvent.CLICK, this._lvHandler, this);
			this.btn_lv2.removeEventListener(lxl.CEvent.CLICK, this._lvHandler, this);
		}

		private _lvHandler(e:lxl.CEvent):void {
			if(e.currentTarget == this.btn_lv1) {
				app.QipanManager.getInstance().model = 1;
			} else if(e.currentTarget == this.btn_lv2) {
				app.QipanManager.getInstance().model = 2;
			}
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.SEL_COMPLETE));
		}

		private _huyanHandler(e:lxl.CEvent):void {
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.EYE_CHANGE));
		}

		private _changeEyeState(e:lxl.CEvent) {
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
		}

		private _help:app.DlgHelp;
		private _helpHandler(e:lxl.CEvent):void {
			this._help = new app.DlgHelp();
			this.pop(this._help);
			this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_zhishi.touchEnabled = false;
			this._help.addEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
		}

		private helpClose() {
			this._help.removeEventListener(lxl.CEvent.CLOSE, this.helpClose, this)
			this._help.dispose();
			this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_zhishi.touchEnabled = true;
		}

		private _zhishi:app.DlgZhishi;
		private _knowledgeHandler(e:lxl.CEvent):void {
			this._zhishi = new app.DlgZhishi();
			this.pop(this._zhishi);
			this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_zhishi.touchEnabled = false;
			this._zhishi.addEventListener(lxl.CEvent.CLOSE, this.zhishiClose, this);
		}

		private zhishiClose() {
			this._zhishi.removeEventListener(lxl.CEvent.CLOSE, this.zhishiClose, this)
			this._zhishi.dispose();
			this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_zhishi.touchEnabled = true;
		}

		private _homeHandler(e:lxl.CEvent) {
			this.dispose();
		}

	}
}