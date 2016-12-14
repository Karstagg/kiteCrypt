import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {allAppComponents, appRoutingProviders, routing} from "./app.routes";
import {LoginService} from "./services/login-service";
import {SignUpService} from "./services/signup-service";
import {EqualValidator} from './directives/validate-equal.directive';
import {SaltService} from "./services/salt-service";  // import validator
//importing session storage components////////////
import {Ng2Webstorage} from 'ng2-webstorage';
const moduleDeclarations = [AppComponent];
// import {PubNub} from 'nativescript-pubnub';


@NgModule({
	imports: [BrowserModule, FormsModule, HttpModule, routing, Ng2Webstorage],
	declarations: [...moduleDeclarations, ...allAppComponents, EqualValidator],
	bootstrap: [AppComponent],
	providers: [appRoutingProviders, LoginService, SaltService, SignUpService]
})

export class AppModule {}






