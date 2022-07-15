import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  username: string = '';
  chat: FormGroup;

  constructor(
    private stomp: StompService,
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.chat = new FormGroup({
      messageToSend: new FormControl(''),
    });
  }

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
    let date = new Date();
    let mintes = date.getMinutes();
    let strmin;
    if (mintes < 10) {
      strmin = '0' + mintes;
    } else {
      strmin = mintes;
    }

    let time = date.getHours() + ':' + strmin;
    let message = new Message();
    console.log(this.chat.get('messageToSend')!.value);
    message.content = this.chat.get('messageToSend')!.value;
    message.from = this.authService.getUserName();
    message.to = this.username;
    this.chatService.sendMessage(message).subscribe({
      next: () => ((message.time = time), this.messages.push(message)),
      error: (error) => console.log(error),
    });
    this.chat.reset();
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
