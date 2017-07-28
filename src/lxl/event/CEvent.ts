module lxl {
	export class CEventInit implements EventInit {
		bubbles: boolean;
		cancelable: boolean;
	}

	export class CEvent extends egret.Event{
		/**
		 *连接到服务器 
		 */		
		public static CONNECT_SERVER:string = "CEVENT::CONNECT_SERVER";
		
		/**
		 *连接失败 
		 */		
		public static CONNECT_FAIL:string = "CEVENT::CONNECT_FAIL";

		/**
		 *加载资源完成 
		 */		
		public static LOAD_SKIN_COMPLETE:string = "CEVENT::LOAD_SKIN_COMPLETE";
		/**
		 * 加载配置完成
		 */
		public static LOAD_CONFIG_COMPLETE:string = "CEVENT::LOAD_CONFIG_COMPLETE";
		/**
		 * 加载一组资源完成
		 */
		public static LOAD_GROUP_COMPLETE:string = "CEVENT::LOAD_GROUP_COMPLETE";
		/**
		 * 加载进度
		 */
		public static LOAD_PROGRESS:string = "CEVENT::LOAD_PROGRESS";

		public static PRE_CLICK:string = "CEVENT::PRE_CLICK";
		public static CLICK:string = "CEVENT::CLICK";

		//完成选择
		public static SEL_COMPLETE:string = "CEVENT::SEL_COMPLETE";
		//成功完成游戏
		public static SUCCESS:string = "CEVENT::SUCCESS";
		//返回
		public static BACK:string = "CEVENT::BACK";
		//左右上下
		public static UP:string = "CEVENT::UP";
		public static DOWN:string = "CEVENT::DOWN";
		public static LEFT:string = "CEVENT::LEFT";
		public static RIGHT:string = "CEVENT::RIGHT";
		public static SPACE:string = "CEVENT::SPACE";
		//护眼模式
		public static PROTECTE_EYE:string = "CEVENT::PROTECTE_EYE";
		public static EYE_CHANGE:string = "CEVENT::EYE_CHANGE";

		public static GET_MESSAGE_FROM_SERVER:string = "CEVENT::GET_MESSAGE_FROM_SERVER";
		public static GET_STUDENTS_FROM_SERVER:string = "CEVENT::GET_USERLIST_FROM_SERVER";
		public static GET_TEACHER_FROM_SERVER:string = "CEVENT::GET_TEACHER_FROM_SERVER";
		public static GET_MESSAGE:string = "CEVENT::GET_MESSAGE";
		public static GET_LIST:string = "CEVENT::GET_STUDENTS";
		public static GET_TEACHER:string = "CEVENT::GET_TEACHER";
		public static GET_USER_LIST:string = "CEVENT::GET_USER_LIST";//获取用户列表 包含老师
		public static SEL_DEFENDER:string = "CEVENT::SEL_DEFENDER";//选择防守方
		public static SEL_DEFENDER_COMPLETE:string = "CEVENT::SEL_DEFENDER_COMPLETE";
		public static CHESS_MOVE:string = "CEVENT::CHESS_MOVE";//落子
		public static OPEN:string = "CEVENT::OPEN";
		public static READONLY_CHANGE:string = "READONLY_CHANGE";
		private _param:any;
		cancelBubble;
		public constructor(type:string, param:any = null, timeSpan:number = 0, bubbles:boolean = false, cancelable:boolean = false)
		{
			super(type, bubbles, cancelable, param);
			// let ceinit:CEventInit = new CEventInit();
			// ceinit.bubbles = bubbles;
			// ceinit.cancelable = cancelable;
			this._param = param;
		}

		public get param():any {
			return this._param;
		}

	}
}