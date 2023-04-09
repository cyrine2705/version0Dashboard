import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private apiBaseUrl = environment.apiBaseUrl + 'auth';


  constructor(private http: HttpClient) { }

  resetPassword(email: string){
    return this.http.post(this.apiBaseUrl+'/request-password', { email });
  }

  updatePassword(token: string, password: string){
    return this.http.post(`${this.apiBaseUrl}/reset-password?token=${token}`, { password });
  }
}
