import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  resetPassword(email: string){
    return this.http.post('/auth/reset-password', { email });
  }

  updatePassword(token: string, password: string){
    return this.http.post('/auth/reset-password/' + token, { password });
  }
}
