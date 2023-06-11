import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
 options = { headers:this.headers, withCredentials: true };


  private apiBaseUrl = 'https://localhost:8885/';


  constructor(private http: HttpClient) { }
  
  training() {

        return this.http.get(this.apiBaseUrl+"training/");

  }
  
}