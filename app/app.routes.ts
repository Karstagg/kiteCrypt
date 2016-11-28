import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home-component";
import {signUpComponent} from "./components/signup-component";

export const allAppComponents = [HomeComponent];

export const routes: Routes = [
	{path: "", component: HomeComponent},
	{path: "signUp", component: signUpComponent}
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes);