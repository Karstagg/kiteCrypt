import {Component, OnInit, ViewChild} from "@angular/core";
import {Message} from "../classes/message";
import {Status} from "../classes/status";
import {ChatService} from "../services/chat-service";
import {PusherService} from "../services/pusher-service";
import {KeyService} from "../services/key-service"
import {Keys} from "../classes/keys";

@Component({
	templateUrl: "./templates/chat.php"
})

export class ChatComponent implements OnInit {
	@ViewChild("danielForm") danielForm : any;
	message : Message = new Message(null, null, null);
	status : Status = null;
	keys : Keys[] = [];

	constructor(protected chatService: ChatService, protected pusherService : PusherService, protected keyService: KeyService) {}

	ngOnInit() : void {
		this.subscribeToTest();
	}

	keyChain () : void {
		this.keyService.getKeys()
		.subscribe(keys => this.keys = keys);
		console.log(this.keys);
	}
	subscribeToTest() : void {
		this.pusherService.subscribeToTest();
	}
	danielMinusMinus() : void {
		this.chatService.chat(this.message)
			.subscribe(status => this.status = status);
			console.log(this.message);
	}
}