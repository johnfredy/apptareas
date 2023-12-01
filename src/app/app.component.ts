import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  id: string | null = '';
  title = 'apptareas';
  constructor(private router: Router,  public userService: UsersService) {
  }
  ngOnInit() {
    // this.getUserLogged();
    this.id = localStorage.getItem('usuario');
      // this.id = this.cookies.get("token");
  }
  logout(): void {
    console.log("Logout");
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
