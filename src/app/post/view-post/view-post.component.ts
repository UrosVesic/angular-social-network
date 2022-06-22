import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { PostModel } from 'src/app/service/post-model';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
})
export class ViewPostComponent implements OnInit {
  post: PostModel;

  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute
  ) {
    this.post = {
      id: 0,
      title: '',
      content: '',
      likes: 0,
      dislikes: 0,
      userName: '',
      topicName: '',
      commentCount: 0,
      duration: '',
      likeCount: 0,
    };
    this.post.id = this.activateRoute.snapshot.params['id'];
    this.postService.getPost(this.post.id).subscribe({
      next: (data) => {
        this.post = data;
      },
      error: (error) => throwError(() => error),
    });
  }

  ngOnInit(): void {}
}
