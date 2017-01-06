import {Injectable} from "@angular/core";
declare var Pusher: any;

@Injectable()
export class PusherService {

	private pusher : any;
	public channels : any[] = [];
	public newSearchTerm : any;
	constructor() {
		this.pusher = new Pusher("4e04fbf13149f67488cd");
		this.channels = [];
	}

	//subscribeToTest() : void {
		//this.pusher.subscribe("sendText");
	//}

	subscribeToFriendChannel(firstFriend: number, secondFriend: number) {
		let lower = Math.min(firstFriend, secondFriend);
		let higher = Math.max(firstFriend, secondFriend);

		// make a connection to the friends API and receive the friends list
		// then put this.pusher.subscribe() within an Observable.subscribe()
		// connect to pusher iff they're friends
		this.pusher.subscribe("sendText-" + lower + "-" + higher);
		this.channels.push({term: this.newSearchTerm, active: true});
	}
}