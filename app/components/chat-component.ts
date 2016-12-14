import {Component, OnInit} from "@angular/core";
import {PusherService} from "../services/pusher-service"

@Component({
	templateUrl: "./templates/chat.php"
})

export class ChatComponent implements OnInit {

	constructor(protected pusherService : PusherService) {}

	ngOnInit() : void {
		this.subscribeToTest();
	}

	subscribeToTest() : void {
		this.pusherService.subscribeToTest();
	}
}