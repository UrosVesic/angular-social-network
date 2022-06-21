import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  getAllPosts(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(
      'http://localhost:8080/api/post/all'
    );
  }
}
