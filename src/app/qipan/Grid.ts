module app {
	export class Grid extends lxl.ui.CLayer{
		public constructor() {
			super();
			// super("resource/eui_skins/GridSkin.exmls");
		}

		private _logicPos:string = "";
		private _shape:egret.Shape;
		private _shape2:egret.Shape;
		private _lab:eui.Label;
		private _lab2:eui.Label;
		private _filled:boolean = false;
		private _img:eui.Image;
		private _posArr:Array<string> = [];
		private _data:GridMap = new GridMap();

		onActivity():void {
			super.onActivity();
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
		}

		set logicPos(str:string) {
			this._logicPos = str;
			let posArr = str.split("_");
			this._posArr = posArr;
			this.x = parseInt(posArr[0]) * lxl.Config.GRID_SIZE;
			this.y = parseInt(posArr[1]) * lxl.Config.GRID_SIZE;
			this._data.loc_x = parseInt(posArr[0]);
			this._data.loc_y = parseInt(posArr[1]);
		}

		get logicPos():string {
			return this._logicPos;
		}

		get data():GridMap {
			return this._data;
		}

		setChessType(type:string) {
			this._data.chessType = type;
			if(type == "attacker") {
				this._img.source = "black_png";
			} else if(type == "defender") {
				this._img.source = "white_png";
			}
			this._img.visible = false;
		}

		private _clickHandler(e:egret.TouchEvent):void {
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.PRE_CLICK, this));
			// if(this.filled == false) {
			// 	this.setFilled(true);
			// 	this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLICK, this));
			// }
			// else {
			// 	//可以加点特效
			// }
		}

		setBorderInVisible(dir:string) {
			this._shape2.graphics.lineStyle(5, 0);
			switch(dir) {
				case "top":
					this._shape2.graphics.moveTo(0, this.height / 2);
					this._shape2.graphics.lineTo(this.width, this.height / 2);
					this._shape2.graphics.endFill();
					this._shape2.graphics.lineStyle(2, 0);
					this._shape2.graphics.moveTo(this.width / 2, this.height / 2);
					this._shape2.graphics.lineTo(this.width / 2, this.height);
					if(this._posArr[1] == "1") {
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
					if(this._posArr[0] == "1") {
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
					if(this._posArr[1] == "1") {
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
					if(this._posArr[1] == "1") {
						this._lab.y = -30;
						this._lab.text = String.fromCharCode(65 + parseInt(this._posArr[0]) - 1);
					}
				break;
				case "bottom,left":
				case "left,bottom":
					this._shape2.graphics.moveTo(this.width / 2, 0);
					this._shape2.graphics.lineTo(this.width / 2, this.height / 2);
					this._shape2.graphics.lineTo(this.width, this.height / 2);
					if(this._posArr[0] == "1") {
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
					this._shape2.graphics.lineTo(this.width /2, this.height);
					this._shape2.graphics.moveTo(0, this.height / 2);
					this._shape2.graphics.lineTo(this.width, this.height / 2);
			}
			this._shape2.graphics.endFill();
		}

		get filled():boolean {
			return this._filled;
		}

		setFilled(b:boolean, ani:boolean = true) {
			if(b == false) {
				this._img.visible = false;
				this._filled = false;
			}
			else {
				// this._shape.graphics.beginFill(0xff0000);
				// this._shape.graphics.drawCircle(this.width / 2, this.height / 2, (this.width / 2) - 5);
				// this._shape.graphics.endFill();
				this._img.visible = true;
				if(ani == true) {
					egret.Tween.get(this._img)
						.to({alpha: 0}, 200, egret.Ease.quintIn)
						.to({alpha: 1}, 500, egret.Ease.quintOut);
				}
				this._filled = true;
			}
		}

		dispose() {
			super.dispose();
			this._logicPos = "";
			this._lab.text = "";
			this._filled = false;
			this._img.visible = false;
			this._posArr = [];
			this._data = new GridMap();

			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
		}
	}
}