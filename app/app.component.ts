import {Component} from "@angular/core";
declare var Pusher: any;

@Component({
	// Update selector with YOUR_APP_NAME-app. This needs to match the custom tag in webpack/index.php
	selector: 'kitecrypt-app',

	// templateUrl path to your public_html/templates directory.
	templateUrl: './templates/kitecrypt-app.php'
})

export class AppComponent {
	private pusher : any;

	constructor() {
		this.pusher = new Pusher("4e04fbf13149f67488cd");
	}

	navCollapse = true;

	toggleCollapse() {
		this.navCollapse = !this.navCollapse;
	}
}