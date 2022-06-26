import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { throwError } from 'rxjs';
import { UserService } from 'src/app/auth/user-profile/service/user.service';
import { UserModel } from 'src/app/auth/user-profile/user-model';

@Component({
  selector: 'app-suggested-users',
  templateUrl: './suggested-users.component.html',
  styleUrls: ['./suggested-users.component.css'],
})
export class SuggestedUsersComponent implements OnChanges {
  users: UserModel[] = [];
  displayViewAll: boolean = false;

  constructor(private userService: UserService) {
    this.userService.getAllSuggestedUsers().subscribe((data) => {
      if (data.length >= 4) {
        this.users = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.users = data;
      }
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  follow(username: string) {
    this.userService.follow(username).subscribe({
      next: () => this.updateUsers(),
      error: (error) => console.log(error),
    });
  }

  updateUsers() {
    this.userService.getAllSuggestedUsers().subscribe((data) => {
      if (data.length >= 4) {
        this.users = data.splice(0, 3);
        this.displayViewAll = true;
        console.log('uso sam u vise od 4');
      } else {
        this.users = data;
        this.displayViewAll = false;
        console.log('Nisam uso nzm kako');
      }
    });
  }
}
