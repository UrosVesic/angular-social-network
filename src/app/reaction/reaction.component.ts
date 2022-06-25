import { Component, Input, OnInit } from '@angular/core';
import {
  faComments,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { throwError } from 'rxjs';
import { PostModel } from 'src/app/post/post-model';
import { PostService } from '../post/service/post.service';
import { ReactionModel } from './reaction-model';
import { ReactionType } from './reaction-type';
import { ReactionService } from './service/reaction.service';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css'],
})
export class ReactionComponent implements OnInit {
  reactionModel: ReactionModel;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faComments = faComments;
  @Input() post: PostModel;

  constructor(
    private reactionService: ReactionService,
    private postService: PostService
  ) {
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
      liked: false,
      disliked: false,
    };
    this.reactionModel = {
      postId: 0,
      reactionType: ReactionType.LIKE,
    };
  }

  ngOnInit(): void {
    this.updateReactDetails();
  }

  like() {
    this.reactionModel.reactionType = ReactionType.LIKE;
    this.react();
  }

  dislike() {
    this.reactionModel.reactionType = ReactionType.DISLIKE;
    this.react();
  }

  private react() {
    this.reactionModel.postId = this.post.id;
    this.reactionService.react(this.reactionModel).subscribe({
      next: () => this.updateReactDetails(),
      error: (error) => throwError(() => error),
    });
  }

  private updateReactDetails() {
    this.postService.getPost(this.post.id).subscribe((post) => {
      this.post = post;
    });
  }
}
