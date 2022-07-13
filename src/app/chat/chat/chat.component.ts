import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  username: string = ''

  constructor(private stomp: StompService,
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((routeParams) => {
      this.username = routeParams['username'];
    });
    this.stomp.subscribe('/topic', (): any => {
      this.getAllMessages();
    })
    this.getAllMessages()
  }
  getAllMessages() {
    this.chatService.getAllMessages().subscribe({
      next: (data) => this.messages = data,
      error: (error) => console.log(error)
    })
  }

  send() {
    let message = new Message();
    message.content = this.messageToSend;
    this.chatService.sendMessage(message).subscribe({
      next: () => console.log("success"),
      error: (error) => console.log(error)
    })
  }

}
