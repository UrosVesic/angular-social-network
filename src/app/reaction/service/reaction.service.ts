import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ReactionModel } from '../reaction-model';

@Injectable({
  providedIn: 'root',
})
export class ReactionService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  react(reactionModel: ReactionModel): Observable<any> {
    if (!this.authService.isLogged()) {
      this.router.navigateByUrl('/login');
    }
    return this.httpClient.post(
      'http://localhost:8080/api/react/',
      reactionModel
    );
  }
}
