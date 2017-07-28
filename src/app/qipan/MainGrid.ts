module app {
	export class MainGrid extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "MainGrid.exml");
		}

		private btn_huyan:lxl.ui.CButton;
		private btn_help:lxl.ui.CButton;
		private btn_knowledge:lxl.ui.CButton;
		private group_model:eui.Group;
		private group:eui.Group;
		private btn_shuoming:lxl.ui.CButton;
		private btn_zhishi:lxl.ui.CButton;
		private btn_start:lxl.ui.CButton;

		onActivity():void {
			super.onActivity();
			this.btn_help.addEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
			this.btn_huyan.addEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
			this.btn_knowledge.addEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
			this.btn_shuoming.addEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
			this.btn_zhishi.addEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
			this.btn_start.addEventListener(lxl.CEvent.CLICK, this._startHandler, this);
			let info = lxl.Tool.callJS("getInfoToken");
			if(info._userRole == "COORDINATOR") {
				Qipan.viewData.type = "showFrist";
				Qipan.viewData.gameIndex = 2;
				Qipan.dataHandler.sendMessageToServer(Qipan.viewData);
			}
			lxl.Tool.callJS("loadGameComplete");
		}

		dispose() {
			super.dispose();
			this.btn_help.removeEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
			this.btn_huyan.removeEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
			this.btn_knowledge.removeEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
			this.btn_shuoming.removeEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
			this.btn_zhishi.removeEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
			this.btn_start.removeEventListener(lxl.CEvent.CLICK, this._startHandler, this);
		}

		private _sel:SelBattle;
		private _startHandler(e:lxl.CEvent) {
			// this._sel = new SelBattle();
			// this.pop(this._sel);
			// this._sel.once(lxl.CEvent.SEL_COMPLETE, this._lvHandler,this);
			this.group_model.visible = false;
			let view:TeachWatchView = new TeachWatchView();
			view.once(lxl.CEvent.LOAD_SKIN_COMPLETE, ()=>{
				this.addChild(view);
			}, this);
		}

		private _lvHandler(e:lxl.CEvent):void {
			this._sel.dispose();
			this.group_model.visible = false;
			let teach
		}

		private _help:app.DlgHelp;
		private _helpHandler(e:lxl.CEvent):void {
			this._help = new app.DlgHelp();
			this.pop(this._help);
			this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = false;
			this._help.addEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
		}

		private helpClose() {
			this._help.removeEventListener(lxl.CEvent.CLOSE, this.helpClose, this)
			this._help.dispose();
			this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = true;
		}

		private _huyanHandler(e:lxl.CEvent):void {
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.EYE_CHANGE));
		}

		private _changeEyeState(e:lxl.CEvent) {
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
		}

		private _zhishi:app.DlgZhishi;
		private _knowledgeHandler(e:lxl.CEvent):void {
			this._zhishi = new app.DlgZhishi();
			this.pop(this._zhishi);
			this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = false;
			this._zhishi.addEventListener(lxl.CEvent.CLOSE, this.zhishiClose, this);
		}

		private zhishiClose() {
			this._zhishi.removeEventListener(lxl.CEvent.CLOSE, this.zhishiClose, this)
			this._zhishi.dispose();
			this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = true;
		}

		private _backHandler(e:lxl.CEvent) {
			this.btn_knowledge.visible = this.btn_help.visible = false;
			this.group_model.visible = true;
		}
	}
}