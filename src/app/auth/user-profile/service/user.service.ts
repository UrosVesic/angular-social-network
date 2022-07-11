import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ReportedUserModel } from 'src/app/user/reported-users/reported-user-model';
import { environment } from 'src/environments/environment';
import { UserModel } from '../user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getProfileInfo(username: string): Observable<UserModel> {
    return this.http.get<UserModel>(
      this.baseUrl + 'api/user/profile-info/' + username
    );
  }

  follow(username: String): Observable<any> {
    return this.http.post(
      this.baseUrl + 'api/user/follow/' + username,
      username
    );
  }

  unfollow(username: String): Observable<any> {
    return this.http.post(this.baseUrl + 'api/user/unfollow/' + username, null);
  }

  getAllSuggestedUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.baseUrl + 'api/user/suggested');
  }

  getAllFollowersForUser(username: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(
      this.baseUrl + 'api/user/followers/' + username
    );
  }

  getAllFollowingForUser(username: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(
      this.baseUrl + 'api/user/following/' + username
    );
  }

  updateUser(user: UserModel) {
    return this.http.patch(this.baseUrl + 'api/user/', user);
  }

  getReportedUsers(): Observable<Array<ReportedUserModel>> {
    return this.http.get<Array<ReportedUserModel>>(this.baseUrl + 'api/user/reported');
  }

  disableUser(username: string): Observable<any> {
    return this.http.patch(this.baseUrl + 'api/user/disable/' + username, null);
  }

  enableUser(username: string): Observable<any> {
    return this.http.patch(this.baseUrl + 'api/user/enable/' + username, null);
  }
}
