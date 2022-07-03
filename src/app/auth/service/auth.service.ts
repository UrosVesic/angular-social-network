import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPaylaod } from '../signup/signup-request.payload';
import { map, Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  signup(signupRequestPayload: SignupRequestPaylaod): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/auth/signup',
      signupRequestPayload,
      { responseType: 'text' }
    );
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient
      .post<LoginResponse>(
        'http://localhost:8080/api/auth/login',
        loginRequestPayload
      )
      .pipe(
        map((data) => {
          this.localStorage.store(
            'authenticationToken',
            data.authenticationToken
          );
          this.localStorage.store('username', data.username);
          this.localStorage.store('isAdmin', data.isAdmin);
          this.loggedIn.emit(true);
          this.username.emit(loginRequestPayload.username);
          return true;
        })
      );
  }
  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  isLogged(): boolean {
    return this.getJwtToken() != null;
  }

  logout() {
    this.localStorage.clear();
    this.loggedIn.emit(false);
  }

  isAdmin(): boolean {
    return this.localStorage.retrieve('isAdmin') == 'yes';
  }

  getUserName(): string {
    return this.localStorage.retrieve('username');
  }
}
