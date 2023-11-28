import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { User } from "../../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`/api/user/${id}`);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>("https://reqres.in/api/login", user);
  }
  
  register(user: any): Observable<any> {
    return this.http.post("https://reqres.in/api/register", user);
  }
}
