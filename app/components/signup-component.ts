import {Component, ViewChild} from "@angular/core";
import {SignUpService} from "../services/signup-service";
import {SignUp} from "../classes/signup";
import {Status} from "../classes/status";
import {SaltRequest} from "../classes/salt-request";
import {Router} from "@angular/router";
import {SaltService} from "../services/salt-service";
import {Salt} from "../classes/salt";
import * as jsbnAll from "../../jsbn/jsbn-all"
//import {LocalStorageService} from "../../node_modules/ng2-webstorage";




@Component({
	templateUrl: "./templates/signup.php"
})

export class SignUpComponent {
	@ViewChild("signUpForm") signUpForm: any;
	signUpData: SignUp = new SignUp("", "", "", "", "", "");
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

					let sendersPrivateMultiplier = jsbnAll.generateSendersPrivateMultiplier(this.signUpData.password, this.salt.salt);

					let sendersMultipliedPoint = jsbnAll.calculateSendersMultipliedPoint(sendersPrivateMultiplier);

					this.signUpData.salt = this.salt.salt;
					this.signUpData.publicKeyX = sendersMultipliedPoint[0];
					this.signUpData.publicKeyY = sendersMultipliedPoint[1];
						this.signUpData.password = "123abc";
						this.signUpData.passwordConfirm = "123abc";

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
// 	createUser(): void {
// 		let sendersPrivateMultiplier = jsbnAll.generateSendersPrivateMultiplier(this.signUpData.password, this.salt.salt);
// 		console.log("sender keys = " + sendersPrivateMultiplier);
// 		// let luckyBoy = convertStringToHex("one" + "two");
// 		//calculating senders keys
// 		// let rng = jsbnAll.initializeEllipticCurveParameters();
//
// 		let sendersMultipliedPoint = jsbnAll.calculateSendersMultipliedPoint(sendersPrivateMultiplier);
// 		console.log(this.signUpData.password + this.salt.salt + "        " + sendersPrivateMultiplier + "               " + sendersMultipliedPoint);
// 	}
}
