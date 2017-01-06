import {Component} from "@angular/core";
declare var Pusher: any;

@Component({
	// Update selector with YOUR_APP_NAME-app. This needs to match the custom tag in webpack/index.php
	selector: 'kitecrypt-app',

	// templateUrl path to your public_html/templates directory.
	templateUrl: './templates/kitecrypt-app.php'
})

export class AppComponent {
	navCollapse = true;

	toggleCollapse() {
		this.navCollapse = !this.navCollapse;
	}
}