import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {BaseService} from "./base-service";
import {Status} from "../classes/status";
import {Message} from "../classes/message";

@Injectable()
export class ChatService extends BaseService {
	constructor(protected http: Http) {
		super(http);
	}

	private messageUrl = "api/messages/";

	chat(message : Message) : Observable<Status> {
		return(this.http.post(this.messageUrl, message)
			.map(this.extractMessage)
			.catch(this.handleError));
	}
}