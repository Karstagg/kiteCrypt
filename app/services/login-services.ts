import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {BaseService} from "./base-service";
import {Misquote} from "../classes/login";
import {Status} from "../classes/status";

@Injectable()
export class LoginService extends BaseService {
	constructor(protected http: Http) {
		super(http);
	}

	private misquoteUrl = "api/login/";

	doLogin(misquote: Misquote) : Observable<Status> {
		return(this.http.put(this.misquoteUrl + misquote.misquoteId, misquote)
			.map(this.extractMessage)
			.catch(this.handleError));
	}
}