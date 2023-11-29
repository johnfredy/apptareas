import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { User } from "../../interfaces/user";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  getUser(): Observable<User> {
    let id="1";
    return this.http.get<User>(`/api/user/${id}`);
  }

  login(user: User): Observable<any> {
    return this.http.post<any>("http://localhost:8080/api/Login", user);
  }
  
  logout(user: User){
    this.cookies.delete("token");
  }
  logoutva(){
    localStorage.setItem('isLoggedIn', "false");
  }

  
  register(user: any): Observable<any> {
    return this.http.post("https://reqres.in/api/register", user);
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
