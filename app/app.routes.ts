import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home-component";
import {SignUpComponent} from "./components/signup-component";
import {ChatterBoxComponent} from "./components/chatter-box-component";

export const allAppComponents = [HomeComponent, SignUpComponent, ChatterBoxComponent];

export const routes: Routes = [
	{path: "", component: HomeComponent},
	{path: "signup", component: SignUpComponent},
	{path: "chatter-box", component: ChatterBoxComponent}
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes);