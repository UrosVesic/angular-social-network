import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPaylaod } from '../signup/signup-request.payload';
import { map, Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { environment } from 'src/environments/environment';
import { Ip } from 'src/app/public-api/ip';
import { Location } from 'src/app/public-api/location';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  @Output() locatioEmmiter: EventEmitter<Location> = new EventEmitter();
  ip: Ip = { ip: '' };
  location: Location = {
    city: '',
    country_name: '',
  };
  baseUrl = environment.baseUrl;
  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  signup(signupRequestPayload: SignupRequestPaylaod): Observable<any> {
    return this.httpClient.post(
      this.baseUrl + 'api/auth/signup',
      signupRequestPayload,
      { responseType: 'text' }
    );
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient
      .post<LoginResponse>(this.baseUrl + 'api/auth/login', loginRequestPayload)
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
    this.httpClient.post(this.baseUrl+'api/auth/logout','').subscribe({
      next: () => (console.log('ok')),
      error: (error) => console.log('error'),
    })
  }

  isAdmin(): boolean {
    return this.localStorage.retrieve('isAdmin') == 'yes';
  }

  getUserName(): string {
    return this.localStorage.retrieve('username');
  }
}
