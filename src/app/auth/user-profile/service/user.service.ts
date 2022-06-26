import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserModel } from '../user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProfileInfo(username: string): Observable<UserModel> {
    return this.http.get<UserModel>(
      'http://localhost:8080/api/user/profile-info/' + username
    );
  }

  follow(username: String): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/user/follow/' + username,
      username
    );
  }

  unfollow(username: String): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/user/unfollow/' + username,
      null
    );
  }

  getAllSuggestedUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(
      'http://localhost:8080/api/user/suggested'
    );
  }
}
