module app {
	export class DlgWin extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "DlgWinSkin.exml");
		}

		private btn_jixu:lxl.ui.CButton;
		private _sound:egret.Sound;
		private lab_desc:eui.Label;
		private _sound1:egret.Sound;
		private _txt:string;

		onActivity():void {
			super.onActivity();
			let shape:egret.Shape;
			shape= new egret.Shape();
			shape.graphics.beginFill(0x000000, 0.4);
			shape.graphics.drawRect(0, 0, this.width, this.height);
			shape.graphics.endFill();
			this.addChildAt(shape, 0);
			this.btn_jixu.addEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
			this._sound = Res.getRes("win_mp3");
			this._sound.play(0, 1);
			this._sound1 = Res.getRes("click_guanqia_mp3");
			this.lab_desc.text = this._txt;
		}

		setLab(str:string):void {
			this._txt = str;
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