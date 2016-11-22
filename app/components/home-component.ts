
import {Component} from "@angular/core";
import {LoginService} from "../services/login-service";
import {Login} from "../classes/login";
import {Status} from "../classes/status";

@Component({
	templateUrl: "./templates/home.php"
})

export class HomeComponent {
	loginData: Login = new Login("", "");
	status: Status = null;

	constructor(private loginService: LoginService) {

	}

	login() : void {
		this.loginService.login(this.loginData)
			.subscribe(status => this.status = status);
	}
}