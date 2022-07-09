import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/user-profile/service/user.service';
import { UserModel } from 'src/app/auth/user-profile/user-model';

@Component({
  selector: 'app-reported-users',
  templateUrl: './reported-users.component.html',
  styleUrls: ['./reported-users.component.css'],
})
export class ReportedUsersComponent implements OnInit {
  users: UserModel[] = [];
  username: string = '';
  searchText: string = '';

  constructor(private userService: UserService) {
    //userService.getReportedUsers();
  }

  ngOnInit(): void {}

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(searchValue);
  }

  searchMatch(user: UserModel) {
    if (this.searchText == '') {
      return true;
    }
    return user.username.includes(this.searchText);
  }
}
