import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from "../../interfaces/user";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent { 
  userId: string = "1";
  email: string = '';
  password: string = '';
  user$!: Observable<User>;

  constructor(public userService: UsersService) {}
  // ngOnInit(): void {
  //   this.user$ = this.userService.getUser(this.userId);
  // }
  login() {
    const user = { email: this.email, password: this.password };
    this.userService.login(user).subscribe((data) => {
      console.log(data);
    });
  }
  
}
