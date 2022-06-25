import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { PostModel } from 'src/app/post/post-model';
import { PostService } from 'src/app/post/service/post.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  username: string;
  postLength: number;
  posts: PostModel[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService
  ) {
    this.username = activatedRoute.snapshot.params['username'];
    this.postLength = 0;
  }

  ngOnInit(): void {
    this.postService.getAllPostsForUser(this.username).subscribe({
      next: (data) => ((this.posts = data), (this.postLength = data.length)),
      error: (error) => throwError(() => error),
    });
  }

  yourProfile(): boolean {
    return this.authService.getUserName() == this.username;
  }
}
