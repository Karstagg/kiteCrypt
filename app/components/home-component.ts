import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService} from "../services/login-service";
import {Login} from "../classes/login";
import {Status} from "../classes/status";



@Component({
	templateUrl: "./templates/home.php"
})

export class HomeComponent {
	loginData: Login = new Login("", "");
	loginStatus: Status;

	constructor(private loginService: LoginService, private router: Router) {

	}

	login() : void {
		this.loginService.login(this.loginData)
			.subscribe(currentStatus => {
				this.loginStatus = currentStatus;
				if (this.loginStatus.status === 200){
				//	This is where we react to a successful login//
					this.router.navigate(["/chat/"]);

				}
			});
	}
}