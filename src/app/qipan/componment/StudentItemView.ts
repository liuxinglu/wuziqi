module app {
	export class StudentItemView extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "StudentItemViewSkin.exml");
		}

		private lab_name:eui.Label;
		// private progress:eui.ProgressBar;
		private img_type:eui.Image;
		private _data:UserInfo;

		set data(d:UserInfo) {
			this._data = d;
		}

		get data():UserInfo {
			return this._data;
		}

		updateData(){
			this.lab_name.text = this._data.userName;
		}
		
		setActivity() {
			this.img_type.visible = true;
		}

		unActivity() {
			this.img_type.visible = false;
		}

		onActivity() {
			super.onActivity();
		}

		dispose() {
			super.dispose();
		}
	}
}