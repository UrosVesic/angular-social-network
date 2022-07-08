import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentModel } from './comment-model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  postComment(commentModel: CommentModel): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'api/comment/', commentModel);
  }
  getAllCommentsForPost(postId: number): Observable<CommentModel[]> {
    return this.httpClient.get<CommentModel[]>(
      this.baseUrl + 'api/comment/' + postId
    );
  }

  deleteComment(commentId: number) {
    return this.httpClient.delete(this.baseUrl + 'api/comment/' + commentId);
  }
}
