import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HousingService } from '../../services/housing.service';
import { CrearTarea } from '../../interfaces/crear-tarea';
import { TareasService } from '../../services/tareas/tareas.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-crear-tareas',
  templateUrl: './crear-tareas.component.html',
  styleUrl: './crear-tareas.component.css'
})
export class CrearTareasComponent implements OnInit{
  
  usuario: string = '';
  nombre: string = '';
  descripcion: string = '';
  UsuarioId: number = 0;
  tarea: CrearTarea = { nombre:'', descripcion:'', usuario:''}
  housingService = inject(HousingService);
  crearTareaForm: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
  });

	constructor(public tareasService: TareasService,public userService: UsersService, private formBuilder: FormBuilder,private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    
		this.crearTareaForm = this.formBuilder.group({
			nombre: ['', Validators.required, , Validators.minLength(5)],
			descripcion: ['', Validators.required,, Validators.minLength(10)]
		});
  }
  
  crearTarea() {
    console.log("llamado creartabla");
    
    if(localStorage.getItem('token') != null){
      console.log("entro");
      
      this.usuario = localStorage.getItem('usuario') ?? '';
      this.nombre = this.crearTareaForm.get('nombre')?.value;
      this.descripcion = this.crearTareaForm.get('descripcion')?.value;
      this.tarea = { nombre: this.nombre, descripcion: this.descripcion, usuario: this.usuario}
      this.tareasService.creacionTarea(this.tarea).subscribe({
        next: (response) => {
          console.log(response);
        }, 
        error: () =>{
          console.log('ocurrió un error al hacer la petición')
          this.userService.logout();
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
