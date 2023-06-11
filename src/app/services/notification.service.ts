import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from 'src/app/models/notification';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiBaseUrl = environment.apiBaseUrl + 'notifications/token';

 constructor(private http: HttpClient) { }

 sendNotification(notif:Notification): Observable<Notification> {
   
   return this.http.post<Notification>(this.apiBaseUrl,notif);
 }
}
