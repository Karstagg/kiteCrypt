import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {BaseService} from "./base-service";
import {Keys} from "../classes/keys";


@Injectable()
export class KeyService extends BaseService {
	constructor(protected http: Http) {
		super(http);
	}

	private keysUrl = "api/friends/";

	getKeys() : Observable<Keys[]> {
		return(this.http.get(this.keysUrl)
			.map(this.extractData)
			.catch(this.handleError));
	}
}
