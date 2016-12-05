import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {BaseService} from "./base-service";
import {Status} from "../classes/status";
import {Salt} from "../classes/salt";

@Injectable()
export class SaltService extends BaseService {
	constructor(protected http: Http) {
		super(http);
	}

	private saltUrl = "api/salt/";

	salt(salt: Salt) : Observable<Status> {
		return(this.http.post(this.saltUrl, salt)
			.map(this.extractMessage)
			.catch(this.handleError));
	}
}
