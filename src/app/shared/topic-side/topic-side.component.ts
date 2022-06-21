import { Component, OnInit } from '@angular/core';
import { TopicModel } from 'src/app/topic/topic-response';
import { TopicService } from 'src/app/topic/topic.service';

@Component({
  selector: 'app-topic-side',
  templateUrl: './topic-side.component.html',
  styleUrls: ['./topic-side.component.css'],
})
export class TopicSideComponent implements OnInit {
  topics: Array<TopicModel> = [];
  displayViewAll: boolean;

  constructor(private topicService: TopicService) {
    this.displayViewAll = false;
    this.topicService.getAllTopics().subscribe((data) => {
      if (data.length >= 4) {
        this.topics = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.topics = data;
      }
    });
  }

  ngOnInit(): void {}
}
