import {Component, OnInit, ViewChild} from "@angular/core";
import {Message} from "../classes/message";
import {Status} from "../classes/status";
import {ChatService} from "../services/chat-service";
import {PusherService} from "../services/pusher-service";
import {KeyService} from "../services/key-service"
import {Keys} from "../classes/keys";
import * as jsbnAll from "../../jsbn/jsbn-all";

@Component({
	templateUrl: "./templates/chat.php"
})

export class ChatComponent implements OnInit {
	@ViewChild("danielForm") danielForm : any;
	message : Message = new Message(null, null);
	status : Status = null;
	keys : Keys[] = [];

	// keyData: Keys = new Keys(0, "", "", "");
	// keys : Keys = [];

	constructor(protected chatService: ChatService, protected pusherService : PusherService, protected keyService: KeyService) {}

	ngOnInit() : void {
		this.subscribeToTest();
		this.keyChain();
	}


	subscribeToTest() : void {
		this.pusherService.subscribeToTest();
	}
	keyChain () : void {
		this.keyService.getKeys()
			.subscribe(keys => {
				this.keys = keys;
				// console.log(this.keys[0]["profilePublicKeyX"]);
				let receiversPublicKeyX = this.keys[0]["profilePublicKeyX"];
				var sendersData = JSON.parse(localStorage.getItem('sendersData'));
				var sendersPrivateMultiplier = sendersData.sendersPrivateMultiplier;
				var sendersMultipliedX = sendersData.sendersMultipliedPointX;

				let sendersCommonSecretKey = jsbnAll.calculateSendersCommonSecretKey(sendersPrivateMultiplier, receiversPublicKeyX);
			});


	}
	danielMinusMinus() : void {
		this.chatService.chat(this.message)
			.subscribe(status => this.status = status);
			console.log(this.message);

		// let sendersPrivateMultiplier = jsbnAll.generateSendersPrivateMultiplier(this.localStorage.password, this.salt.salt);

		// let sendersMultipliedPoint = jsbnAll.calculateSendersMultipliedPoint(sendersPrivateMultiplier);
		//
		//
		// let receiversMultipliedX = this.keyData.publicKeyX;
		// let receiversMultipliedY = this.keyData.publicKeyY;

		// console.log(receiversMultipliedX);
		//
		//
		//
		//

		// console.log(sendersCommonSecretKey);

	}


}