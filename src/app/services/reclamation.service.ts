import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Material } from '../models/material';
import { Reclam } from '../models/reclam';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiBaseUrl = environment.apiBaseUrl + 'reclamations';

  headers =  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
  

 constructor(private http: HttpClient) { }

 getAllReclams(): Observable<Reclam[]> {
   
   return this.http.get<Reclam[]>(this.apiBaseUrl,{headers:this.headers});
 }
}
