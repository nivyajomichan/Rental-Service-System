import { Injectable } from '@angular/core';
import { chatmessage } from './chatmessage';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  webSocket: WebSocket;
  chatMessages:chatmessage[] = [];

  constructor() {
    this.webSocket = new WebSocket('ws://localhost:8088/chat');
   }

   public openWebSocket(){
    this.webSocket = new WebSocket('ws://localhost:8088/chat');
    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }
  public sendMessage(chatMessageDto: chatmessage){
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
