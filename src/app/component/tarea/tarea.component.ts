import { Component, Input } from '@angular/core';
import { Tarea } from '../../interfaces/tarea';
import { TareasService } from '../../services/tareas/tareas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css'
})
export class TareaComponent {
  @Input() tareaList!: Tarea;

  constructor(public tareasService:TareasService, public router:Router){}
  completado(id: number){  
    this.tareaList.completado = true;  
    this.tareasService.modificarTarea(this.tareaList, id).subscribe({
      next: (Response) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
