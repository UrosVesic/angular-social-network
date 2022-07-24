import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserModel } from 'src/app/auth/user-profile/user-model';
import { StompService } from 'src/app/stomp-service';
import { ChatService } from '../service/chat.service';
import { MessageDto } from './message';
import { Frame } from './websocket-mess';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnChanges {
  messages: MessageDto[] = [];
  @Input() username: string = '';
  chat: FormGroup;
  @Output() callParent = new EventEmitter();
  @Output() read = new EventEmitter<string>();

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

  ngOnChanges(changes: SimpleChanges) {
    this.getAllMessagesFromChat();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((routeParams) => {
      if (routeParams['username'] != '') {
        console.log('aaaa');
        this.username = routeParams['username'];
        this.getAllMessagesFromChat();
      }
    });
    this.stomp.subscribe(
      '/topic/' + this.authService.getUserName(),
      (msg: Frame) => {
        if (msg.body == this.username) {
          this.getLastMessage();
          this.callParent.emit('');
        } else {
          this.callParent.emit('');
        }
      }
    );
  }
  getAllMessagesFromChat() {
    if (this.username != '') {
      this.chatService
        .getAllMessagesFromChat(this.authService.getUserName(), this.username)
        .subscribe({
          next: (data) => (this.messages = data),
          error: (error) => console.log(error),
        });
    }
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
    let message = new MessageDto();
    console.log(this.chat.get('messageToSend')!.value);
    message.content = this.chat.get('messageToSend')!.value;
    message.from = this.authService.getUserName();
    message.to = this.username;
    this.chatService.sendMessage(message).subscribe({
      next: () => (
        (message.time = time),
        this.messages.push(message),
        this.callParent.emit(message)
      ),
      error: (error) => console.log(error),
    });
    this.chat.reset();
  }

  myMessage(msg: MessageDto) {
    return msg.from == this.authService.getUserName();
  }

  getLastMessage() {
    this.chatService
      .getLastMessage(this.username, this.authService.getUserName())
      .subscribe((data) => {
        this.messages.push(data);
      });
  }

  readMessages() {
    this.read.emit(this.username);
  }
}
