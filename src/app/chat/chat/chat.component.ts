import { Component, OnInit } from '@angular/core';
import { Message } from './message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];

  constructor() {}

  ngOnInit(): void {}
}
