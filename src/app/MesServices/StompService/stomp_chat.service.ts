import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root',
})
export class StompChatService {
  private connecting: boolean = false;
  private topicQueue: { topic: string; callback: any }[] = [];

  socket = new SockJS('https://9antrabackend-production.up.railway.app/sba-websocket-chat');
  stompClient = Stomp.over(this.socket);

  subscribe(topic: string, callback: any): void {
    if (this.connecting) {
      this.topicQueue.push({
        topic,
        callback
      });
      return;
    }

    const connected: boolean = this.stompClient.connected;
    if (connected) {
      this.connecting = false;
      this.subscribeToTopic(topic, callback);
      return;
    }

    this.connecting = true;
    this.stompClient.connect({}, (): any => {
      this.subscribeToTopic(topic, callback);

      this.topicQueue.forEach((item: any) => {
        this.subscribeToTopic(item.topic, item.callback);
      });
      this.topicQueue = [];
    });
  }

  private subscribeToTopic(topic: string, callback: any): void {
    this.stompClient.subscribe(topic, (): any => {
      callback();
    });
  }
}

