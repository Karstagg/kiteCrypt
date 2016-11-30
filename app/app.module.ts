import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {allAppComponents, appRoutingProviders, routing} from "./app.routes";
import {LoginService} from "./services/login-service";
import {SignUpService} from "./services/signUp-service";
import { EqualValidator } from './directives/validate-equal.directive';  // import validator

const moduleDeclarations = [AppComponent];

@NgModule({
	imports:      [BrowserModule, FormsModule, HttpModule, routing],
	declarations: [...moduleDeclarations, ...allAppComponents, EqualValidator],
	bootstrap:    [AppComponent],
	providers:    [appRoutingProviders, LoginService, SignUpService]
})
export class AppModule {}

