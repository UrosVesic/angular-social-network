import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageDto } from '../chat/message';
import { InboxMessage } from '../inbox-message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllMessages(): Observable<Array<MessageDto>> {
    return this.http.get<Array<MessageDto>>(this.baseUrl + 'api/message/all');
  }

  sendMessage(message: MessageDto): Observable<any> {
    return this.http.post(this.baseUrl + 'api/message/' + message.to, message);
  }

  getLastMessage(from: string, to: string) {
    return this.http.get<MessageDto>(
      this.baseUrl + 'api/message/last/' + from + '/' + to
    );
  }

  getAllMessagesFromChat(
    from: string,
    to: string
  ): Observable<Array<MessageDto>> {
    return this.http.get<Array<MessageDto>>(
      this.baseUrl + 'api/message/all/' + from + '/' + to
    );
  }

  getInboxMessages(): Observable<Array<InboxMessage>> {
    return this.http.get<Array<InboxMessage>>(
      this.baseUrl + 'api/message/inbox'
    );
  }
}
