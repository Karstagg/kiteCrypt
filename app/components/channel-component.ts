import {
	Component,
	Input,
	AfterViewChecked,
	OnInit,
	OnChanges,
	OnDestroy
} from '@angular/core';

@Component({
	templateUrl: "./templates/chat.php",
	selector: 'subscription',
	moduleId: module.id

})

export default class ChannelComponent implements OnInit, OnChanges, OnDestroy, AfterViewChecked {
	@Input() search: any;
	@Input() pusher: any;
	public messages : Object[];
	private channel: any;
	private className: String;
	private subscribed: boolean = false;

	public ngOnInit() {
		this.subscribeToChannel();
		this.messages = [];
		this.className = this.search.term.replace(' ', '-');
	}

	private subscribeToChannel() {
		this.channel = this.pusher.subscribe(btoa(this.search.term));
		this.channel.bind('newMessage', (data: any) => {
			this.newMessage(data);
		});
		this.subscribed = true;
	}

	private newMessage(data: Object) {
		this.messages.push(data);
	}

	public ngOnChanges() {
		console.log(this.search);
		if (!this.search.active && this.subscribed) {
			this.ngOnDestroy();
		} else if (this.search.active && !this.subscribed) {
			this.subscribeToChannel();
		}
	}

	public ngOnDestroy() {
		this.pusher.unsubscribe(btoa(this.search.term));
		this.channel && this.channel.unbind();
		this.subscribed = false;
	}

	public ngAfterViewChecked() {
		var listItem = document.querySelector(".channel-" + this.className);
		if (listItem) {
			listItem.scrollTop = listItem.scrollHeight;
		}
	}
}



// this is the pusher subscription component