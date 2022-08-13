import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CommentModel } from 'src/app/comment/comment-model';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/post/post-model';
import { PostService } from 'src/app/post/service/post.service';
import { TopicModel } from 'src/app/topic/topic-model';
import { TopicService } from 'src/app/topic/topic.service';
import { PostRequest } from '../post-request';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
})
export class UpdatePostComponent implements OnInit {
  createPostForm: FormGroup;
  topics: Array<TopicModel> = [];
  @Input() postRequest: PostRequest;
  postModel: PostModel;
  id: number = 0;
  constructor(
    private router: Router,
    private topicService: TopicService,
    private postService: PostService,
    private actRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.postModel = {
      commentCount: 0,
      content: '',
      disliked: false,
      dislikes: 0,
      duration: '',
      id: 0,
      liked: false,
      likes: 0,
      title: '',
      topicName: '',
      userName: '',
      usernameDislikes: [],
      usernameLikes: [],
    };
    this.postRequest = {
      title: '',
      content: '',
      topicName: '',
    };
    this.createPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      topicName: new FormControl(''),
      content: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.actRoute.params.subscribe((routeParams) => {
      this.id = routeParams['id'];
    });
    console.log(this.id);
    this.topicService.getAllTopics().subscribe({
      next: (data) => {
        this.topics = data;
      },
      error: (error) => throwError(() => error),
    });
    this.postService.getPost(this.id).subscribe({
      next: (data) =>
        this.createPostForm.patchValue({
          title: data.title,
          topicName: data.topicName,
          content: data.content,
        }),
      error: (error) => console.log(error),
    });
    console.log(this.postModel);
  }
  discardPost() {
    this.router.navigateByUrl('/home');
  }
  updatePost() {
    this.postRequest.title = this.createPostForm.get('title')!.value;
    this.postRequest.content = this.createPostForm.get('content')!.value;
    this.postRequest.topicName = this.createPostForm.get('topicName')!.value;

    this.postService.updatePost(this.postRequest, this.id).subscribe({
      next: (data) => {
        this.router.navigateByUrl(
          '/user-profile/' + this.authService.getUserName()
        );
        console.log(data);
      },
      error: (error) => {
        throwError(() => error);
        console.log(error);
      },
    });
  }
}
