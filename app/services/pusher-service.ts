import {Injectable} from "@angular/core";
declare var Pusher: any;

@Injectable()
export class PusherService {

	private pusher : any;

	constructor() {
		this.pusher = new Pusher("4e04fbf13149f67488cd");
	}

	subscribeToTest() : void {
		this.pusher.subscribe("sendText");
	}
}