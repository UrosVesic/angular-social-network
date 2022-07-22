import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBell,
  faExclamation,
  faInbox,
  faLocation,
  faLocationDot,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/service/auth.service';
import { Location } from 'src/app/public-api/location';
import { StompService } from '../stomp-service';
import { NotificationService } from '../notification/notification.service';
import { NotificationModel } from '../notification/notification-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faLoc = faLocationDot;
  faInbox = faInbox;
  faBell = faBell;
  faExclamation = faExclamation;
  isLoggedIn: boolean;
  username: string;
  location: Location = {
    city: '',
    country_name: '',
  };
  notifications: NotificationModel[] = [];
  notification_count: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private stomp: StompService,
    private notificationService: NotificationService
  ) {
    this.username = '';
    this.isLoggedIn = this.authService.isLogged();
  }

  ngOnInit(): void {
    console.log('/topic/notification/' + this.authService.getUserName());
    this.stomp.subscribe(
      '/topic/notification/' + this.authService.getUserName(),
      () => {
        console.log('primio sam notifikaciju aaaaaaaaaaaaaaaaa');
        this.getLastNotification();
        this.notification_count = this.computeNotificationCount();
      }
    );
    this.getAllNotifications();
    this.authService.loggedIn.subscribe(
      (data: boolean) => ((this.isLoggedIn = data), this.getAllNotifications())
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

  computeNotificationCount(): number {
    let count = 0;
    for (let i = 0; i < this.notifications.length; i++) {
      const element = this.notifications[i];
      if (element.read == false) {
        count++;
      }
    }
    return count;
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
  getLastNotification() {
    this.notificationService.getLastNotification().subscribe((data) => {
      this.notifications.unshift(data),
        (this.notification_count = this.computeNotificationCount());
    });
  }
  getAllNotifications() {
    this.notificationService.getAllNotifications().subscribe((data) => {
      this.notifications = data;
      this.notification_count = this.computeNotificationCount();
    });
  }
  markAsRead(n: NotificationModel) {
    this.notificationService.markAsRead(n).subscribe({
      next: () => (
        this.decreaseNotificationCOunt(n),
        this.router.navigateByUrl('view-post/' + n.postId)
      ),
    });
  }
  decreaseNotificationCOunt(n: NotificationModel) {
    for (let i = 0; i < this.notifications.length; i++) {
      const element = this.notifications[i];
      if (element.id == n.id && element.read == false) {
        element.read = true;
        this.notification_count--;
      }
    }
  }
}
