import { Component, Input, OnInit } from '@angular/core';
import {
  faComments,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { PostModel } from 'src/app/post/post-model';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css'],
})
export class ReactionComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faComments = faComments;
  @Input() post: PostModel;

  constructor() {
    this.post = {
      id: 0,
      title: '',
      content: '',
      commentCount: 0,
      dislikes: 0,
      likes: 0,
      duration: '',
      topicName: '',
      userName: '',
      likeCount: 0,
    };
  }

  ngOnInit(): void {}

  like() {}
  dislike() {}
}
