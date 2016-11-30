import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home-component";
import {SignUpComponent} from "./components/signUp-component";

export const allAppComponents = [HomeComponent, SignUpComponent];

export const routes: Routes = [
	{path: "", component: HomeComponent},
	{path: "signUp", component: SignUpComponent}
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes);