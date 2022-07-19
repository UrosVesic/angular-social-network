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
  username: string = '';
  inboxMessages: InboxMessage[] = [];
  msg: MessageDto;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private stomp: StompService
  ) {
    this.msg = {
      content: '',
      from: '',
      time: '',
      to: '',
    };
  }

  ngOnInit(): void {
    this.chatService
      .getInboxMessages()
      .subscribe(
        (data) => (
          (this.inboxMessages = data),
          (this.username = this.inboxMessages[0].with)
        )
      );
    /*this.chatService.sentMessage.subscribe((data: string) =>
      this.getInboxMessages()
    );*/
    /*this.chatService.sentMessage.subscribe((data: string) => {
      this.chatService
        .getLastMessage(data, this.authService.getUserName())
        .subscribe((data) => this.replaceWithSentMessage(data));
    });*/
  }

  getMsgFromBaby($event: any) {
    this.msg = $event;
    console.log(this.msg);
    this.getInboxMessages();
  }

  replaceWithSentMessage(data: MessageDto) {
    for (let i = 0; i < this.inboxMessages.length; i++) {
      const element = this.inboxMessages[i];
      if (element.with == data.from || element.with == data.to) {
        if (data.content.length > 15) {
          this.inboxMessages[i].content = data.content.slice(0, 15) + '...';
        } else {
          this.inboxMessages[i].content = data.content;
        }
      }
    }
  }

  print(msg: InboxMessage) {
    console.log(msg.content);
    this.username = msg.with;
  }

  getInboxMessages() {
    this.chatService
      .getInboxMessages()
      .subscribe((data) => (this.inboxMessages = data));
  }
}
