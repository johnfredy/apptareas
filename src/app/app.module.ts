import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodolistComponent } from './component/todolist/todolist.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/RegisterComponent';
import { HomeComponent } from './component/home/home.component';
import { AuthGuard } from './services/auth/auth.guard';
import { TareaComponent } from './component/tarea/tarea.component';
import { DetailsComponent } from './component/details/details.component';
import { CrearTareasComponent } from './component/crear-tareas/crear-tareas.component';

@NgModule({
  declarations: [ AppComponent, TodolistComponent, LoginComponent, RegisterComponent, HomeComponent, TareaComponent, DetailsComponent, CrearTareasComponent ],
  imports: [ BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule ],
  providers: [CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
