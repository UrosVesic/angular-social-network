import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostRequest } from '../create-post/post-request';
import { PostModel } from '../post-model';
import { ReportedPostModel } from '../reported-post-model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  getAllPosts(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(this.baseUrl + 'api/post/all');
  }

  getAllPostsForUser(username: string): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(
      this.baseUrl + 'api/post/user/' + username
    );
  }

  createPost(postRequest: PostRequest): Observable<PostModel> {
    return this.httpClient.post<PostModel>(
      this.baseUrl + 'api/post/create',
      postRequest
    );
  }

  updatePost(postRequest: PostRequest, id: number): Observable<PostModel> {
    return this.httpClient.patch<PostModel>(
      this.baseUrl + 'api/post/update/' + id,
      postRequest
    );
  }

  getPost(id: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>(this.baseUrl + 'api/post/' + id);
  }

  deletePost(postId: number) {
    return this.httpClient.delete(this.baseUrl + 'api/post/' + postId);
  }

  getAllPostsForFollowingUsers(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(
      this.baseUrl + 'api/post/authAll'
    );
  }

  getAllReportedPosts(): Observable<Array<ReportedPostModel>> {
    return this.httpClient.get<Array<ReportedPostModel>>(
      this.baseUrl + 'api/post/secured/reported'
    );
  }

  getAllSolvedReportedPosts(): Observable<Array<ReportedPostModel>> {
    return this.httpClient.get<Array<ReportedPostModel>>(
      this.baseUrl + 'api/post/secured/reported-solved'
    );
  }

  softDeletePost(id: number): Observable<any> {
    return this.httpClient.patch(
      this.baseUrl + 'api/post/soft-delete/' + id,
      ''
    );
  }
}
