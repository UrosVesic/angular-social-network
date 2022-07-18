import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { StompService } from 'src/app/stomp-service';
import { MessageDto } from '../../chat/message';
import { InboxMessage } from '../../inbox-message';
import { ChatService } from '../../service/chat.service';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent implements OnInit {
  username: string = 'pera';
  inboxMessages: InboxMessage[] = [];

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private stomp: StompService
  ) {}

  ngOnInit(): void {
    this.stomp.subscribe(
      '/topic/' + this.authService.getUserName(),
      (): any => {
        this.getInboxMessages();
      }
    );
    this.getInboxMessages();
  }

  print(msg: InboxMessage) {
    console.log(msg.content);
    this.username = msg.with;
  }

  getInboxMessages() {
    this.chatService
      .getInboxMessages()
      .subscribe(
        (data) => (
          (this.inboxMessages = data),
          (this.username = this.inboxMessages[0].with)
        )
      );
  }
}
