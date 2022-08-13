import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserService } from 'src/app/user/service/user.service';
import { UserModel } from 'src/app/user/user-model';
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
  enteredValue: string = '';
  users: UserModel[] = [];

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private stomp: StompService,
    private userService: UserService
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
  }

  getMsgFromBaby($event: any) {
    this.msg = $event;
    console.log(this.msg);
    this.getInboxMessages();
  }

  readMessages($event: string) {
    for (let i = 0; i < this.inboxMessages.length; i++) {
      const element = this.inboxMessages[i];
      if (element.with == $event && element.newMessages != 0) {
        this.chatService.readMessages(element.with).subscribe(() => {
          this.chatService.emitNumberOfSeenMessages(element.newMessages);
          element.newMessages = 0;
        });
      }
    }
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

  viewMessages(username: string, msg: InboxMessage) {
    this.username = username;
    //emitovanje smanjena broja neprocitanih poruka
    this.chatService.emitNumberOfSeenMessages(msg.newMessages);
    msg.newMessages = 0;
  }

  getInboxMessages() {
    this.chatService
      .getInboxMessages()
      .subscribe((data) => (this.inboxMessages = data));
  }

  searchTextChanged() {
    if (this.users.length == 0) {
      this.userService
        .getAllFollowingForUser(this.authService.getUserName())
        .subscribe((data) => {
          this.users = data;
        });
    }
  }
  searchMatch(username: string) {
    if (this.enteredValue == '') {
      return true;
    }
    return username.includes(this.enteredValue);
  }

  inboxContainsUser() {
    for (let i = 0; i < this.inboxMessages.length; i++) {
      const element = this.inboxMessages[i];
      if (element.with.includes(this.enteredValue)) {
        return true;
      }
    }
    return false;
  }
}
