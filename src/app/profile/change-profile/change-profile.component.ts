import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { UserService } from 'src/app/auth/user-profile/service/user.service';
import { UserModel } from 'src/app/auth/user-profile/user-model';
import { __values } from 'tslib';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css'],
})
export class ChangeProfileComponent implements OnInit {
  faUser = faUser;
  user: UserModel;
  username: string = '';
  changeProfileForm: FormGroup;

  constructor(
    private userService: UserService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.changeProfileForm = new FormGroup({
      username: new FormControl('', Validators.required),
      bio: new FormControl(''),
      email: new FormControl('', Validators.required),
    });
    this.user = {
      bio: '',
      created: '',
      email: '',
      followedByCurrentUser: false,
      mutualFollowers: 0,
      numOfFollowers: 0,
      numOfFollowing: 0,
      userId: 0,
      username: '',
    };
  }

  ngOnInit(): void {
    this.username = this.actRoute.snapshot.params['username'];
    this.userService.getProfileInfo(this.username).subscribe({
      next: (data) => (
        (this.user = data),
        this.changeProfileForm.patchValue({
          bio: data.bio,
          username: data.username,
          email: data.email,
        })
      ),
    });
  }

  updateProfile() {
    if (
      this.user.bio == this.changeProfileForm.get('bio')!.value &&
      this.user.email == this.changeProfileForm.get('email')!.value &&
      this.user.username == this.changeProfileForm.get('username')!.value
    ) {
      this.router.navigateByUrl('user-profile/' + this.username);
      return;
    }

    if (this.user.username != this.changeProfileForm.get('username')!.value) {
      this.user.bio = this.changeProfileForm.get('bio')!.value;
      this.user.email = this.changeProfileForm.get('email')!.value;
      this.user.username = this.changeProfileForm.get('username')!.value;

      this.userService.updateUser(this.user).subscribe({
        next: (data) => (
          this.router.navigateByUrl('login'),
          this.authService.logout(),
          alert('Login with new username')
        ),
        error: (error) => (alert(error.error.message), console.log(error)),
      });
      return;
    }

    this.user.bio = this.changeProfileForm.get('bio')!.value;
    this.user.email = this.changeProfileForm.get('email')!.value;

    this.userService.updateUser(this.user).subscribe({
      next: (data) => (
        this.router.navigateByUrl('user-profile/' + this.username),
        this.userService.getProfileInfo(this.username).subscribe({
          next: (data) => (this.user = data),
        })
      ),
      error: (error) => (alert(error.error.message), console.log(error)),
    });
  }
}
