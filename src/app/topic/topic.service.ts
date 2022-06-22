import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicModel } from './topic-model';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  constructor(private http: HttpClient) {}

  getAllTopics(): Observable<Array<TopicModel>> {
    return this.http.get<Array<TopicModel>>(
      'http://localhost:8080/api/topic/all'
    );
  }

  createTopic(topicModel: TopicModel): Observable<TopicModel> {
    return this.http.post<TopicModel>(
      'http://127.0.0.1:8080/api/topic/create',
      topicModel
    );
  }
}
