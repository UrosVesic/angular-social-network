import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentModel } from './comment-model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  postComment(commentModel: CommentModel): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/comment/',
      commentModel
    );
  }
  getAllCommentsForPost(postId: number): Observable<CommentModel[]> {
    return this.httpClient.get<CommentModel[]>(
      'http://localhost:8080/api/comment/' + postId
    );
  }

  deleteComment(commentId: number) {
    return this.httpClient.delete(
      'http://localhost:8080/api/comment/' + commentId
    );
  }
}
