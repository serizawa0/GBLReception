import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../backService/socket.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import User from '../../../classes/User';
import { LogService } from '../../../services/log.service';
import { Router, RouterOutlet } from '@angular/router';
import { SelectForPrivateComponent } from './select-for-private/select-for-private.component';
import { SelectForGroupedComponent } from './select-for-grouped/select-for-grouped.component';

@Component({
  selector: 'app-chat',
  imports: [
    ReactiveFormsModule, RouterOutlet,SelectForPrivateComponent,SelectForGroupedComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{
  messageForm:FormGroup
  message = ''
  messages:string[] = []
  user:User
  constructor(
    private socketService:SocketService,
    private form:FormBuilder,
    private logService:LogService,
    private router:Router
  ){
    this.messageForm = this.form.group({
      message:''
    })
    this.user = this.logService.user
    // console.log(this.user);
    localStorage.removeItem('token')
  }

  ngOnInit(): void {

    this.socketService.onMessage().subscribe( msg => {
      this.messages.push(msg)
      console.log(msg);
    } )
    this.socketService.onUserConnected().subscribe(id => {
      this.messages.push(`🟢 ${id} a rejoint le chat`);
    });
    this.socketService.onUserDisconnected().subscribe(id => {
      this.messages.push(`🔴 ${id} a quitté le chat`);
    });
  }

  send() {
    this.message = this.messageForm.get('message')?.value
    // console.log(this.message);
    
    if (this.message.trim()) {
      this.socketService.sendMessage(this.message);
      this.messages.push(`🟣 (moi) ${this.message}`);
      this.message = '';
    }
  }
  toPrivateMessage(){
    this.router.navigate(['home/chat/private'])
  }
  toGroupedMessage(){
    this.router.navigate(['home/chat/grouped'])
  }
}
