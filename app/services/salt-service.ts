import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {BaseService} from "./base-service";
import {Salt} from "../classes/salt";
import {SaltRequest} from "../classes/salt-request";

@Injectable()
export class SaltService extends BaseService {
	constructor(protected http: Http) {
		super(http);
	}

	private saltUrl = "api/salt/";

	salt(saltRequest: SaltRequest) : Observable<Salt[]> {
		return(this.http.post(this.saltUrl, saltRequest)
			.map(this.extractData)
			.catch(this.handleError));
	}
}
