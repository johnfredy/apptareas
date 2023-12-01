import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HousingLocation } from '../../interfaces/housinglocation';
import { HousingService } from '../../services/housing.service';
import { TareasService } from '../../services/tareas/tareas.service';
import { Tarea } from '../../interfaces/tarea';

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
  tareaList: Tarea[] = [];
  filterTareaList: Tarea[] = [];
  tareaTodoList: Tarea[] = [];
  tareaDoneList: Tarea[] = [];

  constructor(private router: Router, private cookies: CookieService, public userService: UsersService, public tareasService: TareasService) {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
    this.tareasService.getAllTareasTodo().subscribe({
      next: (tareaList: Tarea[]) => {
        console.log(tareaList);
        this.tareaList = tareaList;
        this.filterTareaList = tareaList;
        this.filterCompletado(this.filterTareaList);
      }, 
      error: () =>{
        console.log('ocurrió un error al hacer la petición')
        this.userService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
  ngOnInit() {
    // this.getUserLogged();
    this.id = localStorage.getItem('usuario');
      // this.id = this.cookies.get("token");
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
  filterCompletado(tareas: Tarea[]){
    tareas.forEach(element => {
      if (element.completado) {
        this.tareaDoneList.push(element);
      }
      else{
        this.tareaTodoList.push(element);
      }
    });
    console.log(this.tareaTodoList);
    console.log(this.tareaDoneList);
    
  }
  getUserLogged() {
    this.userService.getUser().subscribe((user) => {
      console.log(user);
    });
  }
   
  logout(): void {
    console.log("Logout");
    this.userService.logout();
    this.router.navigate(['/login']);
  }
  newTask() {
    this.router.navigate(['/creacion']);
  }
}
