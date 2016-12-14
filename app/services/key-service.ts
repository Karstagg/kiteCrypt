import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {BaseService} from "./base-service";
import {Status} from "../classes/status";
import {} from "../classes/message";

@Injectable()
export class ChatService extends BaseService {
	constructor(protected http: Http) {
		super(http);
	}

	private keysUrl = "api/friends/";

	keys(keys : Keys) : Observable<Status> {
		return(this.http.post(this.keysUrl, keys)
			.map(this.extractMessage)
			.catch(this.handleError));
	}
}
