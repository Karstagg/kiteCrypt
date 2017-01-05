import {Component, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {Message} from "../classes/message";
import {Status} from "../classes/status";
import {ChatService} from "../services/chat-service";
import {PusherService} from "../services/pusher-service";
import {KeyService} from "../services/key-service"
import {Keys} from "../classes/key";
import * as jsbnAll from "../../jsbn/jsbn-all";



@Component({
	templateUrl: "./templates/chat.php"
})

export class ChatComponent implements OnInit {
	@ViewChild("chatForm") chatForm: any;
	message: Message = new Message(null, null);
	status: Status = null;
	keys: Keys[] = [];
	receiversPublicKeyX: string = null;
	receiversPublicKeyY: string = null;
	sendersPrivateMultiplier: string = null;
	sendersMultipliedX: string = null;
	sendersCommonSecretKey: string = null;
	sendersId: number = null;
	receiversCommonSecretKey: string = null;
	cipherText: string = null;
	decryptedText: string = null;

	// keyData: Keys = new Keys(0, "", "", "");
	// keys : Keys = [];

	constructor(protected chatService: ChatService, protected pusherService: PusherService, protected keyService: KeyService) {
	}

	ngOnInit(): void {
		this.subscribeToFriendChannel();
		this.keyChain();
	}


	keyChain(): void {
		this.keyService.getKeys()
			.subscribe(keys => {
				this.keys = keys;
				// console.log(this.keys[0]["profilePublicKeyX"]);

				let sendersData = JSON.parse(localStorage.getItem('sendersData'));
				this.sendersPrivateMultiplier = sendersData.sendersPrivateMultiplier;
				this.sendersMultipliedX = sendersData.sendersMultipliedPointX;
				this.sendersId = sendersData.sendersId;
			});

	}

	subscribeToFriendChannel(): void {
		this.pusherService.subscribeToFriendChannel(this.sendersId, this.keys["profileId"]);
	}

	sendText(): void {
		console.log(this.message.messageText);
		this.receiversPublicKeyX = this.keys[0]["profilePublicKeyX"];
		this.receiversPublicKeyY = this.keys[0]["profilePublicKeyY"];
		console.log(this.receiversPublicKeyX);
		console.log(this.sendersPrivateMultiplier);
		this.sendersCommonSecretKey = jsbnAll.calculateSendersCommonSecretKey(this.sendersPrivateMultiplier, this.receiversPublicKeyX, this.receiversPublicKeyY);
		console.log(this.sendersCommonSecretKey);
		this.cipherText = jsbnAll.encryptMessage(this.sendersCommonSecretKey, this.message.messageText);
		console.log(this.cipherText);
		this.message.messageText = this.cipherText;

		this.decryptedText = jsbnAll.decryptMessage(this.sendersCommonSecretKey, this.cipherText);
		console.log(this.decryptedText);

		this.chatService.chat(this.message)
			.subscribe(status => {
				this.status = status;
				console.log(this.message);

			});


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