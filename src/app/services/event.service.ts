import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conge } from '../models/conge';
import { Events } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiBaseUrl = environment.apiBaseUrl + 'event';

  headers =  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
  

 constructor(private http: HttpClient) { }

 getAllEvents(): Observable<Events[]> {
   
   return this.http.get<Events[]>(this.apiBaseUrl,{headers:this.headers});
 }
 addEvent(e:Events): Observable<any> {
   
  return this.http.post<Events>(this.apiBaseUrl,e,{headers:this.headers});
}
getEvent(id:String):Observable<Events> {  return this.http.get<Events>(this.apiBaseUrl+'/'+id,{headers:this.headers});
}
updateEvent(e:Events): Observable<any> {
   
  return this.http.put<Events>(this.apiBaseUrl,e,{headers:this.headers});
}
 
}
