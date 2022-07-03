import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCircleCheck,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ReportedPostModel } from 'src/app/post/reported-post-model';
import { PostService } from 'src/app/post/service/post.service';
import { ReportStatus } from '../report-status';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-reported-post',
  templateUrl: './reported-post.component.html',
  styleUrls: ['./reported-post.component.css'],
})
export class ReportedPostComponent implements OnInit {
  posts: ReportedPostModel[] = [];
  faAlert = faTriangleExclamation;
  faApproved = faCircleCheck;
  active = 1;

  constructor(
    private router: Router,
    private authService: AuthService,
    private postService: PostService,
    private reportService: ReportService
  ) {
    this.postService.getAllReportedPosts().subscribe({
      next: (data) => ((this.posts = data), console.log(this.posts)),
    });
  }

  ngOnInit(): void {}

  goToPost(id: number) {
    this.router.navigateByUrl('/view-post/' + id);
  }

  isPostOwnedByLoggedUser(postUsername: string): boolean {
    return this.authService.getUserName() == postUsername;
  }

  softDeletePost(postId: number) {
    this.postService.softDeletePost(postId).subscribe({
      next: () =>
        this.postService.getAllReportedPosts().subscribe({
          next: (data) => (this.posts = data),
          error: (error) => console.log(error),
        }),
      error: (error) => console.log(error),
    });
  }

  aprovePost(id: number) {
    this.reportService.changeReportStatus(id, ReportStatus.APPROVED).subscribe({
      next: () =>
        this.postService
          .getAllReportedPosts()
          .subscribe((data) => (this.posts = data)),
    });
  }
}
