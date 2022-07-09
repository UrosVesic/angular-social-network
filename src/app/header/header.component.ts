import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faLocation,
  faLocationDot,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/service/auth.service';
import { Location } from 'src/app/public-api/location';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faLoc = faLocationDot;
  isLoggedIn: boolean;
  username: string;
  location: Location = {
    city: '',
    country_name: '',
  };

  constructor(private authService: AuthService, private router: Router) {
    this.username = '';
    this.isLoggedIn = this.authService.isLogged();
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(
      (data: boolean) => (this.isLoggedIn = data)
    );
    this.authService.username.subscribe(
      (data: string) => (this.username = data)
    );
    this.authService.locatioEmmiter.subscribe(
      (data: Location) => (this.location = data)
    );
    this.isLoggedIn = this.authService.isLogged();
    this.username = this.authService.getUserName();
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.isLoggedIn = false;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  goToAdminPage() {
    this.router.navigateByUrl('admin');
  }
}
