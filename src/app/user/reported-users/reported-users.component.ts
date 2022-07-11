import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserService } from 'src/app/auth/user-profile/service/user.service';
import { UserModel } from 'src/app/auth/user-profile/user-model';
import { ReportedUserModel } from './reported-user-model';

@Component({
  selector: 'app-reported-users',
  templateUrl: './reported-users.component.html',
  styleUrls: ['./reported-users.component.css'],
})
export class ReportedUsersComponent implements OnInit {
  users: ReportedUserModel[] = [];
  username: string = '';
  searchText: string = '';

  constructor(private userService: UserService, private authService: AuthService) {
    this.getReportedUsers();

  }

  ngOnInit(): void { }

  getReportedUsers() {
    this.userService.getReportedUsers().subscribe((data) => (this.users = data, console.log(data))
    )
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(searchValue);
  }

  searchMatch(user: ReportedUserModel) {
    if (this.searchText == '') {
      return true;
    }
    return user.username.includes(this.searchText);
  }

  disableUser(user: ReportedUserModel) {
    this.userService.disableUser(user.username).subscribe({
      next: () => this.getReportedUsers()
    })
  }

  enableUser(user: ReportedUserModel) {
    this.userService.enableUser(user.username).subscribe({
      next: () => this.getReportedUsers()
    })
  }

  isEnabled(user: ReportedUserModel) {
    console.log(user.enabled);
    return user.enabled;
  }

  isMyProfile(user: ReportedUserModel): boolean {
    return user.username == this.authService.getUserName();
  }
}
