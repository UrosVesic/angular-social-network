import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/service/auth.service';
import { NotificationModel } from './notification-model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}

  getLastNotification(): Observable<NotificationModel> {
    return this.http.get<NotificationModel>(
      this.baseUrl + 'api/notification/last/' + this.authService.getUserName()
    );
  }

  getAllNotifications(): Observable<Array<NotificationModel>> {
    return this.http.get<Array<NotificationModel>>(
      this.baseUrl + 'api/notification/all'
    );
  }

  markAsRead(n: NotificationModel): Observable<any> {
    return this.http.patch(
      this.baseUrl + 'api/notification/mark-as-read/' + n.id,
      ''
    );
  }
}
