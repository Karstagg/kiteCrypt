import {
	Component,
	Input,
	AfterViewChecked,
	OnInit
} from '@angular/core';

@Component({
	templateUrl: "./templates/chat.php",
	selector: 'subscription',
	moduleId: module.id

})

export default class ChannelComponent implements OnInit, AfterViewChecked {
	@Input() search: any;
	@Input() pusher: any;
	public messages : Object[];
	private channel: any;
	private className: String;
	private subscribed: any;

	public ngOnInit() {
		this.subscribeToChannel();
		this.messages = [];
		this.className = this.search.term.replace(' ', '-');
	}

	private subscribeToChannel() {
		this.channel = this.pusher.subscribe(btoa(this.search.term));
		this.channel.bind('new_message', (data: any) => {
			this.newMessage(data);
		});
		this.subscribed = true;
	}

	private newMessage(data: Object) {
		this.messages.push(data);
	}

	public ngAfterViewChecked() {
		var listItem = document.querySelector(".channel-" + this.className);
		if (listItem) {
			listItem.scrollTop = listItem.scrollHeight;
		}
	}
}



// this is the pusher subscription component