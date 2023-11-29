import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HousingLocation } from '../../interfaces/housinglocation';
import { HousingService } from '../../services/housing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit {
  id: string | null = '';
  logeado: boolean = false;
  
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor(private router: Router, private cookies: CookieService, public userService: UsersService) {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }
  ngOnInit() {
    this.getUserLogged();
      this.id = localStorage.getItem('token');
      // this.id = this.cookies.get("token");
  }
  filterResults(text: string) {
    console.log("buscar",text);
    
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
  getUserLogged() {
    this.userService.getUser().subscribe((user) => {
      console.log(user);
    });
  }
   
  logout(): void {
    console.log("Logout");
    this.userService.logoutva();
    this.router.navigate(['/login']);
  }
}
