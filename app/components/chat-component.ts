import {Component, OnInit, ViewChild} from "@angular/core";
import {Message} from "../classes/message";
import {PusherService} from "../services/pusher-service";

@Component({
	templateUrl: "./templates/chat.php"
})

export class ChatComponent implements OnInit {
	@ViewChild("danielForm") danielForm : any;
	message : Message = new Message(null, null, null);

	constructor(protected pusherService : PusherService) {}

	ngOnInit() : void {
		this.subscribeToTest();
	}

	subscribeToTest() : void {
		this.pusherService.subscribeToTest();
	}
}