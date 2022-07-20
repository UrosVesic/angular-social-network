import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CommentModel } from 'src/app/comment/comment-model';
import { CommentService } from 'src/app/comment/comment.service';
import { Modals } from 'src/app/modals';
import { PostModel } from 'src/app/post/post-model';
import { PostService } from 'src/app/post/service/post.service';
import { ReportPayload } from 'src/app/report/report-payload';
import { ReportType } from 'src/app/report/report-type';
import { ReportService } from 'src/app/report/report.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
})
export class ViewPostComponent implements OnInit {
  post: PostModel;
  commentForm: FormGroup;
  commentModel: CommentModel;
  comments: CommentModel[] = [];
  postOwnedByLoggedUser: boolean = false;
  reportPayload: ReportPayload;

  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router,
    private reportService: ReportService,
    private modals: Modals
  ) {
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required),
    });
    this.reportPayload = {
      postId: 0,
      username: '',
      reportType: ReportType.CURSING,
    };

    this.post = {
      id: 0,
      title: '',
      content: '',
      likes: 0,
      dislikes: 0,
      userName: '',
      topicName: '',
      commentCount: 0,
      duration: '',
      liked: false,
      disliked: false,
      usernameDislikes: [],
      usernameLikes: [],
    };
    this.commentModel = {
      id: 0,
      postId: this.post.id,
      text: '',
      username: '',
      duration: '',
    };
  }

  ngOnInit(): void {
    this.getCommentsForPost();
    this.activateRoute.params.subscribe((routeParams) => {
      (this.post.id = routeParams['id']),
        this.postService.getPost(this.post.id).subscribe({
          next: (data) => {
            this.post = data;
            this.postOwnedByLoggedUser =
              this.authService.getUserName() == data.userName;
          },
          error: (error) => throwError(() => error),
        }),
        this.getCommentsForPost();
    });
  }

  getPostById() {
    this.postService.getPost(this.post.id).subscribe({
      next: (data) => (this.post = data),
      error: (error) => throwError(() => error),
    });
  }

  postComment() {
    this.commentModel.text = this.commentForm.get('text')!.value;
    this.commentModel.postId = this.post.id;
    this.commentService.postComment(this.commentModel).subscribe({
      next: (data) => this.getCommentsForPost(),
      error: (error) => throwError(() => error),
    });
    this.commentForm.reset();
  }

  getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.post.id).subscribe({
      next: (data) => (this.comments = data),
      error: (error) => throwError(() => error),
    });
  }

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe({
      next: (data) => this.router.navigateByUrl('/'),
    });
  }

  isCommentOwnedByLoggedUser(username: string) {
    return username == this.authService.getUserName();
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe({
      next: () =>
        this.commentService.getAllCommentsForPost(this.post.id).subscribe({
          next: (data) => (this.comments = data),
        }),
    });
  }

  goToEditPost() {
    this.router.navigateByUrl('update-post/' + this.post.id);
  }

  reportPost() {
    this.reportPayload.postId = this.post.id;
    this.reportPayload.reportType = ReportType.CURSING;
    this.reportService.reportPost(this.reportPayload).subscribe({
      next: () => this.modals.successNotification(),
      error: (error) => (
        this.modals.errorNotification(error.error), console.log(error.error)
      ),
    });
  }
}
