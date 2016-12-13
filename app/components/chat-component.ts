import {Component} from "@angular/core";
import * as pusher from "../../pusher/pusher"


@Component({
	templateUrl: "./templates/chat.php"

})

declare var $: any;

export class ChatComponent {




}

chat(): void {

	let sMessage = pusher.sendMessage("This is my message.");
let sNotification = pusher.sendNotification();


$(function() {
	var p = new pusher.Pusher("ba8a764bb7f9047185e4")
	var chatWidget = new pusher.PusherChatWidget(pusher, {
		appendTo: "#pusher_chat_widget"
	});
});

}