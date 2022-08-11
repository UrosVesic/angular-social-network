import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faComments,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Modals } from 'src/app/modals';
import { PostModel } from 'src/app/post/post-model';
import { PostService } from 'src/app/post/service/post.service';
import { ReportPayload } from 'src/app/report/report-payload';
import { ReportType } from 'src/app/report/report-type';
import { ReportService } from 'src/app/report/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() posts: PostModel[] = [];

  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faComments = faComments;
  reportPayload: ReportPayload;

  constructor(
    private router: Router,
    private authService: AuthService,
    private postService: PostService,
    private reportService: ReportService,
    private modals: Modals
  ) {
    this.reportPayload = {
      postId: 0,
      username: '',
      reportType: ReportType.CURSING,
    };
  }

  ngOnInit(): void {}

  goToPost(id: number) {
    this.router.navigateByUrl('/view-post/' + id);
  }

  isPostOwnedByLoggedUser(postUsername: string): boolean {
    return this.authService.getUserName() == postUsername;
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe({
      next: () =>
        this.postService
          .getAllPostsForUser(this.authService.getUserName())
          .subscribe({
            next: (data) => (this.posts = data),
            error: (error) => console.log(error),
          }),
      error: (error) => this.modals.errorNotification('Failed to delete post'),
    });
  }

  goToEditPost(id: number) {
    this.router.navigateByUrl('update-post/' + id);
  }

  reportPost(id: number) {
    this.reportPayload.postId = id;
    this.reportPayload.reportType = ReportType.CURSING;
    this.reportService.reportPost(this.reportPayload).subscribe({
      next: () => this.modals.successNotification(),
      error: (error) => (
        this.modals.errorNotification(error.error), console.log(error.error)
      ),
    });
  }
}
