import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserService } from 'src/app/auth/user-profile/service/user.service';
import { UserModel } from 'src/app/auth/user-profile/user-model';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  users: UserModel[] = [];
  param: string = '';
  username: string = '';

  constructor(
    private userService: UserService,
    private actRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((routeParam) => {
      if (routeParam['info'] == 'suggested') {
        this.param = 'suggested';
        this.userService.getAllSuggestedUsers().subscribe({
          next: (data) => (this.users = data),
          error: (error) => console.log(error),
        });
      }
      if (routeParam['info'] == 'followers') {
        this.param = 'followers';
        this.actRoute.queryParams.subscribe((params) => {
          this.username = params['un'];
        });
        this.userService.getAllFollowersForUser(this.username).subscribe({
          next: (data) => ((this.users = data), console.log(data)),
          error: (error) => console.log(error),
        });
      }
      if (routeParam['info'] == 'following') {
        this.param = 'following';
        this.actRoute.queryParams.subscribe((params) => {
          this.username = params['un'];
        });
        this.userService.getAllFollowingForUser(this.username).subscribe({
          next: (data) => ((this.users = data), console.log(data)),
          error: (error) => console.log(error),
        });
      }
    });
  }

  follow(username: string) {
    this.userService.follow(username).subscribe({
      next: () => {
        console.log(this.param);
        if (this.param == 'followers') {
          this.userService.getAllFollowersForUser(this.username).subscribe({
            next: (data) => (this.users = data),
          });
        } else if (this.param == 'following') {
          console.log('ulazim u following');
          this.userService.getAllFollowingForUser(this.username).subscribe({
            next: (data) => ((this.users = data), console.log(data)),
          });
        } else if (this.param == 'suggested') {
          this.userService.getAllSuggestedUsers().subscribe({
            next: (data) => (this.users = data),
          });
        }
      },
    });
  }
  unfollow(username: string) {
    this.userService.unfollow(username).subscribe({
      next: () => {
        console.log(this.param);
        if (this.param == 'followers') {
          this.userService.getAllFollowersForUser(this.username).subscribe({
            next: (data) => (this.users = data),
          });
        } else if (this.param == 'following') {
          console.log('ulazim u following');
          this.userService.getAllFollowingForUser(this.username).subscribe({
            next: (data) => ((this.users = data), console.log(data)),
          });
        }
      },
    });
  }

  deleteFromMyFollowers(username: string) {
    /*this.userService.deleteFromMyFollowers(username).subscribe({
      next: () =>
        this.userService.getAllSuggestedUsers().subscribe({
          next: (data) => (this.users = data),
        }),
    });*/
  }

  myProfile(): boolean {
    return this.username == this.authService.getUserName();
  }

  getCurrentUser(): string {
    return this.authService.getUserName();
  }
}
