import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conge } from '../models/conge';
import { Material } from '../models/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiBaseUrl = environment.apiBaseUrl + 'material';

  headers =  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
  

 constructor(private http: HttpClient) { }

 getAllMaterial(): Observable<Material[]> {
   
   return this.http.get<Material[]>(this.apiBaseUrl,{headers:this.headers});
 }
 changeMaterialState(id:string, state:string): Observable<Material> {
  console.log(state);
  return this.http.post<Material>(`${this.apiBaseUrl}/${id}`, state, { headers: this.headers });
}
}
