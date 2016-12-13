// /**
//  * Created by Jonathan on 12/13/16.
//  */
// import {Injectable} from "@angular/core";
// import {Http} from "@angular/http";
// import {Observable} from "rxjs/Observable";
// import {BaseService} from "./base-service";
// import {Login} from "../classes/login";
// import {Status} from "../classes/status";
//
// @Injectable()
// export class KeyManager {
//
// 	private kiteKeys: string = 'app_keys';
//
// 	private store(content: Object) {
// 		localStorage.setItem(this.kiteKeys, JSON.stringify(content));
// 	}
//
// 	private retrieve() {
// 		let storedKeys: any = localStorage.getItem(this.kiteKeys);
// 		if(!storedKeys) throw 'no keys found';
// 		return storedKeys;
// 	}
//
// 	public generateNewKeys() {
// 		let keys: any = [];//custom keys generation;
// 	}
//
// 	public retrieveKeys() {
//
// 		let keys = null;
// 		try {
// 			let storedKeys = JSON.parse(this.retrieve());
// 			keys = storedKeys.keys;
// 		} catch
// 			(err) {
// 			console.error(err);
// 		}
// 		return keys;
// 	}
// }

//
// import {Component} from '@angular/core';
// import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
//
// @Component({
// 	selector: 'foo',
// 	template: `foobar`
// })
// export class FooComponent {
//
// 	constructor(private localSt:LocalStorageService) {}
//
// 	ngOnInit() {
// 		this.localSt.observe('key')
// 			.subscribe((value) => console.log('new value', value));
// 	}

// }