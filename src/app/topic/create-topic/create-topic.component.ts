import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Modals } from 'src/app/modals';
import { TopicModel } from '../topic-model';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css'],
})
export class CreateTopicComponent implements OnInit {
  createTopicForm: FormGroup;
  topicModel: TopicModel;

  constructor(
    private topicService: TopicService,
    private router: Router,
    private modals: Modals
  ) {
    this.topicModel = {
      id: 0,
      description: '',
      name: '',
      numberOfPosts: 0,
    };
    this.createTopicForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  createTopic() {
    this.topicModel.name = this.createTopicForm.get('name')!.value;
    this.topicModel.description =
      this.createTopicForm.get('description')!.value;
    this.topicModel.id = 0;
    this.topicModel.numberOfPosts = 0;
    /*(data) => {
      this.router.navigateByUrl('/list-topics');*/
    this.topicService.createTopic(this.topicModel).subscribe({
      next: (data) => this.router.navigateByUrl('/list-topics'),
      error: (data) => this.modals.errorNotification(data.error),
    });
  }

  discard() {
    this.router.navigateByUrl('/home');
  }
}
