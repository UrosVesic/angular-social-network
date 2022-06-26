import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faComments,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/service/auth.service';
import { PostModel } from 'src/app/post/post-model';
import { PostService } from 'src/app/post/service/post.service';

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private postService: PostService
  ) {}

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
      error: (error) => console.log(error),
    });
  }

  goToEditPost(id: number) {
    this.router.navigateByUrl('update-post/' + id);
  }
}
