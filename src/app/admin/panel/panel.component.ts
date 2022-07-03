import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/service/auth.service';
import { PostModel } from 'src/app/post/post-model';
import { ReportedPostModel } from 'src/app/post/reported-post-model';
import { PostService } from 'src/app/post/service/post.service';
import { ReportService } from 'src/app/report/report.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit {
  active = 1;

  constructor() {}

  ngOnInit(): void {}
}
