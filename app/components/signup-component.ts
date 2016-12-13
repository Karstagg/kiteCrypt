import {Component, ViewChild} from "@angular/core";
import {SignUpService} from "../services/signup-service";
import {SignUp} from "../classes/signup";
import {Status} from "../classes/status";
import {SaltRequest} from "../classes/salt-request";
import {Router} from "@angular/router";
import {SaltService} from "../services/salt-service";
import {Salt} from "../classes/salt";
// import * as eccSalt from "../../jsbn/ecc-salt";
// import * as jsbnEcc from "../../jsbn/jsbn-ecc";
// import * as jsbnJsbn1 from "../../jsbn/jsbn-jsbn1";
// import * as jsbnJsbn2 from "../../jsbn/jsbn-jsbn2";
// import * as jsbnPrng4 from "../../jsbn/jsbn-prng4";
// import * as jsbnRng from "../../jsbn/jsbn-rng";
// import * as jsbnSec from "../../jsbn/jsbn-sec";
import * as jsbnAll from "../../jsbn/jsbn-all"




@Component({
	templateUrl: "./templates/signup.php"
})

export class SignUpComponent {
	@ViewChild("signUpForm") signUpForm: any;
	signUpData: SignUp = new SignUp("", "", "");
	salt: Salt = null;
	signUpStatus : Status = null;
	saltRequest: SaltRequest = new SaltRequest("", true);

	constructor(private SaltService: SaltService, private signUpService: SignUpService, private router: Router) {

	}

	signUp(): void {
		if(this.signUpData.password === this.signUpData.passwordConfirm) {
			this.saltRequest.username = this.signUpData.username;
			this.SaltService.salt(this.saltRequest)
				.subscribe(salt => {
					this.salt = salt;
					//this is where key data formula will be inserted. (currently labeled foo())
					this.signUpService.signUp(this.signUpData)
						.subscribe(signUpStatus => {
							this.signUpStatus = signUpStatus;
							if (signUpStatus.status === 200) {
								this.router.navigate(["/home/"]);
							}
						});
				});
		}
	}
	foo(): void {
		let sendersPrivateMultiplier = jsbnAll.generateSendersPrivateMultiplier(this.signUpData.password, this.salt.salt);
		console.log("sender multiplier = " + sendersPrivateMultiplier);
		// let luckyBoy = convertStringToHex("one" + "two");
		//calculating senders keys
		// let rng = jsbnAll.initializeEllipticCurveParameters();
		let sendersMultipliedPoint = jsbnAll.calculateSendersMultipliedPoint(sendersPrivateMultiplier);
		console.log(this.signUpData.password + this.salt.salt + "        " + sendersPrivateMultiplier + "    " + sendersMultipliedPoint);
	}
}
