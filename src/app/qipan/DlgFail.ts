module app {
	export class DlgFail extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "DlgFailSkin.exml");
		}

		private btn_jixu:lxl.ui.CButton;
		private _sound:egret.Sound;
		private _sound1:egret.Sound;

		onActivity():void {
			super.onActivity();
			let shape:egret.Shape;
			shape= new egret.Shape();
			shape.graphics.beginFill(0x000000, 0.4);
			shape.graphics.drawRect(0, 0, this.width, this.height);
			shape.graphics.endFill();
			this.addChildAt(shape, 0);
			this.btn_jixu.addEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
			this._sound = Res.getRes("lose_mp3");
			this._sound.play(0, 1);
			this._sound1 = Res.getRes("click_guanqia_mp3");
		}

		private _closeHandler(e:lxl.CEvent):void {
			this._sound1.play(0, 1);
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE));
		}

		dispose() {
			super.dispose();
			this.btn_jixu.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
		}
	}
}