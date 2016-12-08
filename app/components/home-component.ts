import {Component, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService} from "../services/login-service";
import {Login} from "../classes/login";
import {Status} from "../classes/status";
import {SaltRequest} from "../classes/salt-request";
import {SaltService} from "../services/salt-service";
import {Salt} from "../classes/salt";


@Component({
	templateUrl: "./templates/home.php"
})

export class HomeComponent {
	@ViewChild("loginForm") loginForm: any;
	loginData: Login = new Login("", "");
	salt: Salt = null;
	loginStatus : Status = null;
	saltRequest: SaltRequest = new SaltRequest("", false);

	constructor(private SaltService: SaltService, private loginService: LoginService, private router: Router) {

	}

	login(): void {
		this.saltRequest.username = this.loginData.username;
		this.SaltService.salt(this.saltRequest)
			.subscribe(salt => {
				this.salt = salt;
				this.loginService.login(this.loginData)
					.subscribe(currentStatus => {
						this.loginStatus = currentStatus;
						if(this.loginStatus.status === 200) {
							//	This is where we react to a successful login//
							this.router.navigate(["/chat/"]);
						}
					});
			});
	}
}