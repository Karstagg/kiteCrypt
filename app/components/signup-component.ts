import {Component} from "@angular/core";
import {LoginService} from "../services/login-service";
import {SignUp} from "../classes/signUp";
import {Status} from "../classes/status";

@Component({
	templateUrl: "./templates/signup.php"
})

export class signUpComponent {
	loginData: SignUp = new SignUp("", "");
	status: Status = null;

	constructor(private SignUpService: SignUpService) {

	}

	login() : void {
		this.loginService.login(this.loginData)
			.subscribe(status => this.status = status);
	}
}