import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class EmployesService {

  private apiBaseUrl = environment.apiBaseUrl + 'employes';

   headers =  new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
   

  constructor(private http: HttpClient) { }

  getAllEmployes(): Observable<User[]> {
    console.log('this is the token',localStorage.getItem('jwtToken'));
    return this.http.get<User[]>(this.apiBaseUrl,{headers:this.headers});
  }
  getEmploye(id:String):Observable<User> {  return this.http.get<User>(this.apiBaseUrl+'/'+id,{headers:this.headers});
  }
  deleteEmploye(id:String):Observable<any> {  return this.http.delete<User>(this.apiBaseUrl+'/'+id,{headers:this.headers});
}
  
  updateEmployeFromDashboard(employeId: String, employe: User): Observable<User> {
    const url = `${this.apiBaseUrl}/update/${employeId}`;
    return this.http.put<User>(url, employe,{headers:this.headers});
  }
 
  uploadImage(file: File) {
    const url = 'http://localhost:8080/file/UploadFile';
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(url, formData, { headers: this.headers, responseType: 'text' });
  }
  


}
