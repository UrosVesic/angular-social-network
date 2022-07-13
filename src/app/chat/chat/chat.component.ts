import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { StompService } from 'src/app/stomp-service';
import { ChatService } from '../service/chat.service';
import { Message } from './message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  messageToSend: string = '';
  username: string = '';

  constructor(
    private stomp: StompService,
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((routeParams) => {
      this.username = routeParams['username'];
    });
    console.log(
      '/topic/' + this.authService.getUserName() + '/' + this.username
    );
    this.stomp.subscribe(
      '/topic/' + this.authService.getUserName(),
      (): any => {
        this.getLastMessage();
      }
    );
    this.getAllMessagesFromChat();
  }
  getAllMessagesFromChat() {
    this.chatService
      .getAllMessagesFromChat(this.authService.getUserName(), this.username)
      .subscribe({
        next: (data) => (this.messages = data),
        error: (error) => console.log(error),
      });
  }

  send() {
    let message = new Message();
    console.log(this.messageToSend);
    message.content = this.messageToSend;
    message.from = this.authService.getUserName();
    message.to = this.username;
    this.chatService.sendMessage(message).subscribe({
      next: () => this.messages.push(message),
      error: (error) => console.log(error),
    });
    this.messageToSend = '';
  }

  myMessage(msg: Message) {
    return msg.from == this.authService.getUserName();
  }

  getLastMessage() {
    this.chatService
      .getLastMessage(this.authService.getUserName(), this.username)
      .subscribe((data) => {
        this.messages.push(data);
      });
  }
}
