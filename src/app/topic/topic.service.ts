import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TopicModel } from './topic-model';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAllTopics(): Observable<Array<TopicModel>> {
    return this.http.get<Array<TopicModel>>(this.baseUrl + 'api/topic/all');
  }

  createTopic(topicModel: TopicModel): Observable<TopicModel> {
    return this.http.post<TopicModel>(
      this.baseUrl + 'api/topic/create',
      topicModel
    );
  }
}
