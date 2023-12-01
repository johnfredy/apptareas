import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearTarea } from '../../interfaces/crear-tarea';
import { Observable } from 'rxjs';
import { Tarea } from '../../interfaces/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  constructor( private http: HttpClient) { }
  
  creacionTarea(tarea: CrearTarea) : Observable<any>{
    console.log("endpoint",tarea);
    const token = localStorage.getItem('token') ?? '';
    console.log("token",token);
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    
    return this.http.post<any>("http://localhost:8080/api/tarea", tarea, { headers });
  }
  
  getTareaTodo(id:number): Observable<Tarea> {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    
    return this.http.get<any>("http://localhost:8080/api/tarea/obtenerTarea?id="+id, { headers });
  }
  getAllTareasTodo(): Observable<Tarea[]> {
    const token = localStorage.getItem('token') ?? '';
    const usuario = localStorage.getItem('usuario') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    
    return this.http.get<any>("http://localhost:8080/api/tarea/"+usuario, { headers });
  }
  modificarTarea(tarea: Tarea, id:number): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put("http://localhost:8080/api/tarea/"+id, tarea,{ headers });
  }
  eliminarTarea(id:number): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete("http://localhost:8080/api/tarea/"+id,{ headers });
  }
}
