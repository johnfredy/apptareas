import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { LoginComponent } from "./component/login/login.component";
import { RegisterComponent } from "./component/register/register.component";
import { DetailsComponent } from './component/details/details.component';


export const routes: Routes = [
    { path: "", component: AppComponent, title: 'Home page', pathMatch: "full" },
    { path: 'details/:id', component: DetailsComponent, title: 'Home details' },
    { path: "login", component: LoginComponent, pathMatch: "full" },
    { path: "register", component: RegisterComponent, pathMatch: "full" },
];

export const routing = RouterModule.forRoot(routes);