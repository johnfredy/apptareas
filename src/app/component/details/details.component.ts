import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasService } from '../../services/tareas/tareas.service';
import { Tarea } from '../../interfaces/tarea';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  tareaService = inject(TareasService);
  tarea: Tarea = {nombre: '',
    descripcion: '',
    completado: false,
    id: 0
  };
  tareaForm = new FormGroup({
    descripcion: new FormControl('')
  });

  constructor(public router:Router) {
    const tareaId = parseInt(this.route.snapshot.params['id'], 10);
    this.tareaService.getTareaTodo(tareaId).subscribe({
      next: (tarea) => {
      this.tarea = tarea;
      this.tareaForm.setValue({'descripcion':this.tarea.descripcion})
      console.log(this.tarea);
    },
    error: (error) => {
      console.log(error);
    }
    });
  }
  
  modificarTarea(id:number) {
    this.tarea.descripcion = this.tareaForm.get('descripcion')?.value ?? '';
    this.tareaService.modificarTarea(this.tarea, id).subscribe({
      next: (resp) =>{
      }
    })
    this.router.navigate(['/login']);
  }
  eliminarTarea(id:number){
    this.tareaService.eliminarTarea(id).subscribe({
      next: (resp) =>{
      }
    })
    this.router.navigate(['/login']);
  }
}
