import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { PostModel } from '../post/post-model';
import { PostService } from '../post/service/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Array<PostModel> = [];

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {
    if (authService.isLogged()) {
      this.postService.getAllPostsForFollowingUsers().subscribe((data) => {
        this.posts = data;
      });
    } else {
      this.postService.getAllPosts().subscribe((data) => {
        this.posts = data;
      });
    }
  }

  ngOnInit(): void {}
}
