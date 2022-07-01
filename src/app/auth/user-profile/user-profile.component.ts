import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { throwError } from 'rxjs';
import { PostModel } from 'src/app/post/post-model';
import { PostService } from 'src/app/post/service/post.service';
import { AuthService } from '../service/auth.service';
import { UserService } from './service/user.service';
import { UserModel } from './user-model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  faUser = faUser;
  username: string;
  postLength: number;
  posts: PostModel[] = [];
  userModel: UserModel;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.userModel = {
      created: '',
      email: '',
      userId: 0,
      username: '',
      followedByCurrentUser: false,
      numOfFollowers: 0,
      numOfFollowing: 0,
      mutualFollowers: 0,
      bio: '',
    };
    this.username = '';
    this.postLength = 0;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((routeParams) => {
      this.username = routeParams['username'];
      this.userService.getProfileInfo(this.username).subscribe({
        next: (data) => (this.userModel = data),
        error: (error) => throwError(() => error),
      });
      this.postService.getAllPostsForUser(this.username).subscribe({
        next: (data) => ((this.posts = data), (this.postLength = data.length)),
        error: (error) => throwError(() => error),
      });
    });
  }

  yourProfile(): boolean {
    return this.authService.getUserName() == this.username;
  }

  following(): boolean {
    return this.userModel.followedByCurrentUser;
  }
  follow() {
    this.userService.follow(this.username).subscribe({
      next: () => this.updateProfileInfo(),
      error: (error) => throwError(() => error),
    });
  }
  unfollow() {
    this.userService.unfollow(this.username).subscribe({
      next: () => this.updateProfileInfo(),
      error: (error) => throwError(() => error),
    });
  }

  updateProfileInfo() {
    this.userService.getProfileInfo(this.username).subscribe((data) => {
      this.userModel = data;
    });
  }

  goToChangeProfile() {
    this.router.navigateByUrl('change-profile/' + this.username);
  }
}
