import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { User } from "../../interfaces/user";
import { CookieService } from 'ngx-cookie-service';
import { CrearTarea } from '../../interfaces/crear-tarea';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token: string ='';
  constructor(private http: HttpClient, private cookies: CookieService) {}

  getUser(): Observable<User> {
    let id="1";
    return this.http.get<User>(`/api/user/${id}`);
  }

  login(user: User): Observable<any> {
    return this.http.post<any>("http://localhost:8080/api/Login", user);
  }
  
  logout(){
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  
  register(user: any): Observable<any> {
    return this.http.post("http://localhost:8080/api/Registro/registrar", user);
  }
  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }
  getUserLogged() {
    const token = this.getToken();
    // Aquí iría el endpoint para devolver el usuario para un token
  }
}
