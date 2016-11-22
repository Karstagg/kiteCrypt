
import {Component} from "@angular/core";
import {LoginService} from "../services/login-service";
import {Login} from "../classes/login";
import {Status} from "../classes/status";

@Component({
	templateUrl: "./templates/home.php"
})

export class HomeComponent {
	login: Login = new Login("", "");
	status: Status = null;

	constructor(private loginService: LoginService) {

	}

	login() : void {
		this.loginService.login(this.login)
			.subscribe(status => this.status = status);
	}
}