import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { WebsocketService } from '../websocket.service';
import { chatmessage } from '../chatmessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy  {


  messages:chatmessage[] = [];
  chatForm:FormGroup = new FormGroup({
    message: new FormControl('')
  });

  constructor(public webSocketService:WebsocketService, private authservice:AuthserviceService, private formbuilder:FormBuilder) { }
  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();

    this.chatForm = this.formbuilder.group({
      message: ['',[
        Validators.required,Validators.maxLength(250)
      ]]
    })
  }

  sendMessage() {
    const chatMessageDto = new chatmessage(this.authservice.loggedInUser, this.chatForm.value['message']);
    this.webSocketService.sendMessage(chatMessageDto);
    // sendForm.controls.message.reset();
    // this.messages = this.webSocketService.chatMessages
    this.chatForm.reset();
  }

  get message()
  {
    return this.chatForm.get('message');
  }

}
