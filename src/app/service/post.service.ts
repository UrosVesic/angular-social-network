import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRequest } from '../post/create-post/post-request';
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

  createPost(postRequest: PostRequest): Observable<PostModel> {
    return this.httpClient.post<PostModel>(
      'http://localhost:8080/api/post/create',
      postRequest
    );
  }

  getPost(id: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>(
      'http://localhost:8080/api/post/' + id
    );
  }
}
