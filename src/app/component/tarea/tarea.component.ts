import { Component, Input } from '@angular/core';
import { HousingLocation } from '../../interfaces/housinglocation';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css'
})
export class TareaComponent {
  @Input() housingLocation!: HousingLocation;
}
