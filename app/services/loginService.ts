import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {BaseService} from "./base-service";
import {Misquote} from "../classes/misquote";
import {Status} from "../classes/status";

@Injectable()
export class loginService {
	constructor(protected http: Http) {
		super(http);
	}

	private misquoteUrl = "api/misquote/";

	getAllMisquotes() : Observable<Misquote[]> {
		return(this.http.get(this.misquoteUrl)
			.map(this.extractData)
			.catch(this.handleError));
	}

	createMisquote(misquote: Misquote) : Observable<Status> {
		return(this.http.post(this.misquoteUrl, misquote)
			.map(this.extractMessage)
			.catch(this.handleError));
	}

}