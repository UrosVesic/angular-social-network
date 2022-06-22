import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css'],
})
export class SideComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  goToCreatePost() {
    this.router.navigateByUrl('/create-post');
  }
  goToCreateTopic() {
    this.router.navigateByUrl('/create-topic');
  }
}
