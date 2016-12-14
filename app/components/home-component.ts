import {Component, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService} from "../services/login-service";
import {Login} from "../classes/login";
import {Status} from "../classes/status";
import {SaltRequest} from "../classes/salt-request";
import {SaltService} from "../services/salt-service";
import {Salt} from "../classes/salt";
import * as jsbnAll from "../../jsbn/jsbn-all"

@Component({
	templateUrl: "./templates/home.php"
})

export class HomeComponent {
	@ViewChild("loginForm") loginForm: any;
	loginData: Login = new Login("", "", "", "", "");
	salt: Salt = null;
	loginStatus : Status = null;
	saltRequest: SaltRequest = new SaltRequest("", false);
	// localStorageService: LocalStorageService = new LocalStorageService("", "", "", "", "", "", "");
	//storing: 1) Username, 2)Password, 3)Multiplier, 4)PublicKeyX, 5)PublicKeyY, 6) eCCP,

	constructor(private SaltService: SaltService, private loginService: LoginService, private router: Router) {

	}

	login(): void {
		this.saltRequest.username = this.loginData.username;
		this.SaltService.salt(this.saltRequest)
			.subscribe(salt => {
				this.salt = salt;
				this.loginData.salt = this.salt.salt;
				console.log(this.salt.salt);

				let sendersPrivateMultiplier = jsbnAll.generateSendersPrivateMultiplier(this.loginData.password, this.salt.salt);

				let sendersMultipliedPoint = jsbnAll.calculateSendersMultipliedPoint(sendersPrivateMultiplier);

				this.loginData.publicKeyX = sendersMultipliedPoint[0];
				this.loginData.publicKeyY = sendersMultipliedPoint[1];
				// console.log("Key X" + this.loginData.publicKeyX);
				// console.log("\nKey Y" + this.loginData.publicKeyY);
				// console.log("\nSalt" + this.loginData.salt);
				// this.loginData.password = "123abc";

				this.loginService.login(this.loginData)
					.subscribe(currentStatus => {
						this.loginStatus = currentStatus;

						if(this.loginStatus.status === 200) {
							//	This is where we react to a successful login
							localStorage.setItem('sendersData', JSON.stringify({ sendersPrivateMultiplier: sendersPrivateMultiplier, sendersMultipliedPointX: sendersMultipliedPoint[0], sendersMultipliedPointY: sendersMultipliedPoint[1] }));

							this.router.navigate(["/chat/"]);
						}
					});
			});
	}
}