import {Component, ViewChild} from "@angular/core";
import {SignUpService} from "../services/signup-service";
import {SignUp} from "../classes/signup";
import {Status} from "../classes/status";
import {Router} from "@angular/router";
import {SaltService} from "../services/salt-service";


@Component({
	templateUrl: "./templates/signup.php"
})

export class SignUpComponent {
	@ViewChild("signUpForm") signUpForm: any;
	signUpData: SignUp = new SignUp("", "", "");
	saltStatus: Status = null;
	signUpStatus : Status = null;

	constructor(private SaltService: SaltService, private signUpService: SignUpService, private router: Router) {

	}

	signUp(): void {
		if(this.signUpData.password === this.signUpData.passwordConfirm) {
			this.SaltService.salt(this.signUpData)
				.subscribe(saltStatus => {
					this.saltStatus = saltStatus;
					this.signUpService.signUp(this.signUpData)
						.subscribe(signUpStatus => {
							this.signUpStatus = signUpStatus;
							if (signUpStatus.status === 200) {
								this.router.navigate(["/"]);
							}
						});
				});


		}
	}
}