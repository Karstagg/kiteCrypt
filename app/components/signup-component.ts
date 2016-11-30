import {Component, ViewChild} from "@angular/core";
import {SignUpService} from "../services/signup-service";
import {SignUp} from "../classes/signup";
import {Status} from "../classes/status";


@Component({
	templateUrl: "./templates/signup.php"
})

export class SignUpComponent {
	@ViewChild("signUpForm") signUpForm : any;
	signUpData: SignUp = new SignUp("", "", "");
	status: Status = null;

	constructor(private SignUpService: SignUpService) {

	}

	signUp(): void {
		if(this.signUpData.password === this.signUpData.passwordConfirm) {
			this.SignUpService.signUp(this.signUpData)
				.subscribe(status => this.status = status);
		}
	}
}