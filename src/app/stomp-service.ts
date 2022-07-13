import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  private connecting: boolean = false;
  private topicQueue: any[] = [];

  socket = new SockJS('http://localhost:8080/sba-websocket');
  stompClient = Stomp.over(this.socket);

  subscribe(topic: string, callback: any): void {
    // If stomp client is currently connecting add the topic to the queue
    if (this.connecting) {
      this.topicQueue.push({
        topic,
        callback,
      });
      return;
    }

    const connected: boolean = this.stompClient.connected;
    if (connected) {
      // Once we are connected set connecting flag to false
      this.connecting = false;
      this.subscribeToTopic(topic, callback);
      return;
    }

    // If stomp client is not connected connect and subscribe to topic
    this.connecting = true;
    this.stompClient.connect({}, (): any => {
      this.subscribeToTopic(topic, callback);

      // Once we are connected loop the queue and subscribe to remaining topics from it
      this.topicQueue.forEach((item: any) => {
        this.subscribeToTopic(item.topic, item.callback);
      });

      // Once done empty the queue
      this.topicQueue = [];
    });
  }

  private subscribeToTopic(topic: string, callback: any): void {
    this.stompClient.subscribe(topic, (response?: string): any => {
      callback(response);
    });
  }
}
