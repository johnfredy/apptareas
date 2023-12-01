import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/RegisterComponent';
import { HomeComponent } from './component/home/home.component';
import { AuthGuard } from './services/auth/auth.guard';
import { DetailsComponent } from './component/details/details.component';
import { CrearTareasComponent } from './component/crear-tareas/crear-tareas.component';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full" },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'creacion', component: CrearTareasComponent, canActivate: [AuthGuard] },
  { path: 'details/:id', component: DetailsComponent, title: 'Home details' }
];
// export const routing = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
