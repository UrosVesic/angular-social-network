import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRequest } from '../create-post/post-request';
import { PostModel } from '../post-model';

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

  getAllPostsForUser(username: string): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(
      'http://localhost:8080/api/post/user/' + username
    );
  }

  createPost(postRequest: PostRequest): Observable<PostModel> {
    return this.httpClient.post<PostModel>(
      'http://localhost:8080/api/post/create',
      postRequest
    );
  }

  updatePost(postRequest: PostRequest, id: number): Observable<PostModel> {
    return this.httpClient.patch<PostModel>(
      'http://localhost:8080/api/post/update/' + id,
      postRequest
    );
  }

  getPost(id: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>(
      'http://localhost:8080/api/post/' + id
    );
  }

  deletePost(postId: number) {
    return this.httpClient.delete('http://localhost:8080/api/post/' + postId);
  }

  getAllPostsForFollowingUsers(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(
      'http://localhost:8080/api/post/authAll'
    );
  }
}
