/*import {Component, ViewChild} from "@angular/core";
import {SignUpService} from "../services/signup-service";
import {SignUp} from "../classes/signup";
import {Status} from "../classes/status";
import {Router} from "@angular/router";
import {SaltService} from "../services/salt-service";


@Component({
	templateUrl: "./templates/signup.php"
})

export class SignUpComponent {
	@ViewChild("signUpForm") signUpForm : any;
	signUpData: SignUp = new SignUp("", "", "");
	status: Status = null;

	constructor(private SaltService: SaltService,  private router: Router) {

	}

	signUp(): void {
		if(this.signUpData.password === this.signUpData.passwordConfirm) {
			this.SaltService.salt(this.signUpData)
				.subscribe(status => {
					this.status = status;
					this.salt-service;
				});
			//	This is where we react to a successful login//
			this.router.navigate(["/signup/"]);
		}
	}
}*/