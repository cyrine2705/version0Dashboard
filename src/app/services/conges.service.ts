import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Conge } from '../models/conge';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CongesService {

  private apiBaseUrl = environment.apiBaseUrl + 'conge';

  headers =  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
  

 constructor(private http: HttpClient) { }

 getAllConges(): Observable<Conge[]> {
   
   return this.http.get<Conge[]>(this.apiBaseUrl,{headers:this.headers});
 }
 changeCongeState(id:string, state:string, nb:number): Observable<Conge> {

  console.log(state);
  console.log(nb);
  return this.http.post<Conge>(`${this.apiBaseUrl}/${id}`, {'etat':state,'nb':nb}, { headers: this.headers });
}
}
