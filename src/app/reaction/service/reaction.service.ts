import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { environment } from 'src/environments/environment';
import { ReactionModel } from '../reaction-model';

@Injectable({
  providedIn: 'root',
})
export class ReactionService {
  baseUrl = environment.baseUrl;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  react(reactionModel: ReactionModel): Observable<any> {
    if (!this.authService.isLogged()) {
      this.router.navigateByUrl('/login');
    }
    return this.httpClient.post(this.baseUrl + 'api/react/', reactionModel);
  }
}
