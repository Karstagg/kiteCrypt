// import {Component, ViewChild} from "@angular/core";
// import {Router} from "@angular/router";
// import {LocalStorageService} from "../../node_modules/ng2-webstorage";
// import {Chat} from "../../node_modules/pubnub-angular2";
// import {PubNub} from "../../node_modules/pubnub";
//
//
// @Component({
// 	templateUrl: "./templates/chat.php"
// })
//
// export class ChatComponent {
// 	@ViewChild("chat") chat: any;
//
//
// (function (app) {
//
// 	app.main_component = ng.core.Component({
//
// 		selector: '...',
// 		templateUrl: '...'
//
// 	}).Class({
//
// 		constructor: [window.PubNubAngular, function(pubnubService){
//
// 			pubnubService.init({
// 				publishKey: 'pub-c-4eccb9a2-4a09-4748-8c0e-7475694c09cb',
// 				subscribeKey: 'sub-c-add6d32c-c18b-11e6-9868-02ee2ddab7fe'
// 			});
//
// 			...
// 		}]
// 	});
//
// })(window.app || (window.app = {}));
