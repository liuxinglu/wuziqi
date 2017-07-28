module app {
	export class GridMap {
		public constructor() {

		}

		loc_x:number;
		loc_y:number;
		chessType:string;
	}

	export class UserInfo {
		public constructor() {
		}

		userName:string = "";
		token:string = "";
		userType:string = "";//用户类型 teacher student
		chessType:string = "";
		gridMap:Array<GridMap> = [];//当前用户行棋格子
		studentInfo:any = {};//当前用户的信息
		isWin:number = 0;
	}

	export class ViewData {
		public constructor() {
		}

		type:string = "";//show normal
		gameIndex:number = 0;
		attackerToken:string = "";//先手
		defenderToken:string = "";//后手
		curRole:string = "";//轮到谁下 attacker defender
		userList:Array<UserInfo> = [];
		
		dispose() {
			this.type = "";
			this.attackerToken = "";
			this.defenderToken = "";
			this.userList = [];
		}
	}
}