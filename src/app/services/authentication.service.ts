import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiBaseUrl = environment.apiBaseUrl + 'auth';


  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
  
    return this.http.post(this.apiBaseUrl+"/authenticate", { email: username, password: password }, );
  }
  addEmploye( employe: User): Observable<User> {
    return this.http.post<User>(this.apiBaseUrl+"/register/employe",employe );
  }
  addRH( hr: User): Observable<User> {
    return this.http.post<User>(this.apiBaseUrl+"/register/hr",hr );
  }
}


