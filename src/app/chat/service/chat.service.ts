import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { environment } from 'src/environments/environment';
import { MessageDto } from '../chat/message';
import { InboxMessage } from '../inbox-message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  baseUrl = environment.baseUrl;
  @Output() sentMessage: EventEmitter<string> = new EventEmitter();
  @Output() numberOfSeenMessages: EventEmitter<number> = new EventEmitter();

  constructor(private http: HttpClient, private authService: AuthService) {}

  emitNumberOfSeenMessages(seenMessages: number) {
    this.numberOfSeenMessages.emit(seenMessages);
  }

  getAllMessages(): Observable<Array<MessageDto>> {
    return this.http.get<Array<MessageDto>>(this.baseUrl + 'api/message/all');
  }

  sendMessage(message: MessageDto): Observable<any> {
    let any = this.http.post(
      this.baseUrl + 'api/message/' + message.to,
      message
    );
    console.log(message.to);
    if (message.to == this.authService.getUserName()) {
      this.sentMessage.emit(message.from);
    } else {
      this.sentMessage.emit(message.to);
    }
    return any;
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

  getNumberOfNewMsg(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'api/message/new-msg-count');
  }

  readMessages(username: string) {
    return this.http.patch(this.baseUrl + 'api/message/read/' + username, '');
  }
}
