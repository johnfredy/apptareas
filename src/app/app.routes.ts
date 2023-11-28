import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { LoginComponent } from "./component/login/login.component";
import { RegisterComponent } from "./component/register/register.component";
import { DetailsComponent } from './component/details/details.component';
import { HomeComponent } from './component/home/home.component';


export const routes: Routes = [
    { path: "", component: AppComponent, title: 'Home page', pathMatch: "full" },
    { path: 'details/:id', component: DetailsComponent, title: 'Home details' },
];
export const routeConfig: Routes = [
    { path: '', component: HomeComponent, title: 'Home page' },
    { path: 'details/:id', component: DetailsComponent, title: 'Home details' },
    { path: "login", component: LoginComponent, title: 'Iniciar sesion', pathMatch: "full" },
    { path: "register", component: RegisterComponent, title: 'Registro', pathMatch: "full" },
  ];
export default routeConfig;
export const routing = RouterModule.forRoot(routeConfig);