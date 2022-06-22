import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  isTokenRefreshing = false;

  constructor(public authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwtToken = this.authService.getJwtToken();

    if (jwtToken) {
      console.log(jwtToken);
      return next.handle(this.addToken(req, jwtToken));
    }
    return next.handle(req);
  }

  addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + jwtToken),
    });
  }
}
