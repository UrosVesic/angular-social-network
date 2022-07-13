import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../chat/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllMessages(): Observable<Array<Message>> {
    return this.http.get<Array<Message>>(this.baseUrl + 'api/message/all');
  }

  sendMessage(message: Message): Observable<any> {
    return this.http.post(this.baseUrl + 'api/message/' + message.to, message);
  }

  getLastMessage(from: string, to: string) {
    return this.http.get<Message>(
      this.baseUrl + 'api/message/last/' + from + '/' + to
    );
  }

  getAllMessagesFromChat(from: string, to: string): Observable<Array<Message>> {
    return this.http.get<Array<Message>>(
      this.baseUrl + 'api/message/all/' + from + '/' + to
    );
  }
}
