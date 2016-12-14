import {Component, OnInit, ViewChild} from "@angular/core";
import {Message} from "../classes/message";
import {Status} from "../classes/status";
import {ChatService} from "../services/chat-service";
import {PusherService} from "../services/pusher-service";

@Component({
	templateUrl: "./templates/chat.php"
})

export class ChatComponent implements OnInit {
	@ViewChild("danielForm") danielForm : any;
	message : Message = new Message(null, null, null);
	status : Status = null;

	constructor(protected chatService: ChatService, protected pusherService : PusherService) {}

	ngOnInit() : void {
		this.subscribeToTest();
	}

	subscribeToTest() : void {
		this.pusherService.subscribeToTest();
	}

	danielMinusMinus() : void {
		this.chatService.chat(this.message)
			.subscribe(status => this.status = status);
	}
}