import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Utilisateur from '../../../../classes/Utilisateur';
import { DepartementsService } from '../../../../services/departements.service';
import { ChatService } from '../chat-service/chat.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import PrivateMessage from '../../../../classes/sousclasses/PrivateMessage';
import { SocketService } from '../../../../backService/socket.service';
import { LiaisonBackService } from '../../../../backService/liaison-back.service';
import { PickerModule }from '@ctrl/ngx-emoji-mart'
import { CommonModule } from '@angular/common';
import { log } from 'node:console';

@Component({
  selector: 'app-private-message',
  imports: [
    ReactiveFormsModule, PickerModule, CommonModule
  ],
  templateUrl: './private-message.component.html',
  styleUrl: './private-message.component.scss'
})
export class PrivateMessageComponent implements OnInit, AfterViewChecked{
  url:string
  showEmojiPicker = false;
  @ViewChild('messageContainer') private messageContainer!:ElementRef
  sender:Utilisateur|null = null
  receiver:Utilisateur|null = null
  message:PrivateMessage[] = []
  messageForm:FormGroup
  selectedFiles:File[]|null = null
  dragging = false;
  constructor(
    private chatS:ChatService,
    private fB:FormBuilder,
    private socketS:SocketService,
    private liaisonS:LiaisonBackService
  ){
    this.messageForm = this.fB.group({
      content:''
    })
    this.url = this.liaisonS.url+'images/Avatars/'
  }

  ngOnInit(): void {
    this.chatS.sender$.subscribe(data=> {
      this.reinitialise()
      console.log('sender: '+data?.name);
      
      this.sender = data
    })
    this.chatS.receiver$.subscribe(data=>{
      console.log('receiver: '+data?.name);
      
      this.receiver = data
      if (this.sender&&this.receiver) {
       this.liaisonS.getPrivateMessages(new PrivateMessage(0,'',this.sender?.id,this.receiver?.id,null)).then(
        res => {
          res.subscribe(messages => {
            if(messages.data)
            this.message = messages.data
          })
        }
       ) 
      }
    })
    this.socketS.onMessageSent().subscribe( msg => {
      if((msg[msg.length-1].receiverId == this.receiver?.id)&&(msg[msg.length-1].senderId == this.sender?.id)||(msg[msg.length-1].receiverId == this.sender?.id)&&(msg[msg.length-1].senderId == this.receiver?.id))           
        this.message = msg
    } )
    // this.liaisonS.
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom()
  }

  scrollToBottom(){
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight
    } catch (error) {
      console.log('Scroll error: ', error);
      
    }
  }

  togglePicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  reinitialise(){
    this.messageForm = this.fB.group({
      content:''
    })
  }
  send(){
    const content = this.messageForm.get('content')?.value
    if(this.sender?.id&&this.receiver?.id){
      const newMessage= new PrivateMessage(0,content,this.sender?.id,this.receiver?.id,null)
      console.log(newMessage);
      
      this.socketS.sendPrivateMessage(newMessage)
      // this.socketS.sendMessage('saluuuut')
    }
    this.reinitialise()
  }
  isFromMe(message:PrivateMessage){
    if (message.senderId==this.sender?.id) {
      return true
    }
    else
      return false
  }
  addEmoji(event: any) {
    console.log(event.emoji.native); // 😄
    this.messageForm.get('content')?.setValue(this.messageForm.get('content')?.value + event.emoji.native);
  }
  onFileSelect(event:any){
      const input = event.target as HTMLInputElement;
      if (input.files) {
        this.selectedFiles = Array.from(input.files); // Convert FileList → File[]
        console.log(this.selectedFiles);
        
      }
      
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;

    if (event.dataTransfer?.files) {
      const files = Array.from(event.dataTransfer.files);
      if (this.selectedFiles) {
        this.selectedFiles.push(...files);
        console.log('Fichiers ajoutés :', this.selectedFiles); 
      }
      // Tu peux appeler directement sendMessage() ici si tu veux envoi auto
    }
  }
  getPhoto(){
    if(this.receiver?.avatar){
      return this.url+this.receiver.avatar
    }
    else
      return this.url+'default.jpeg'
  }
  getTime(message:PrivateMessage){
    if (message.createdAt) {
      const date = new Date(message.createdAt)
      const day = date.getDate()
      const month= date.getMonth()+1
      const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return day+'/'+month+' '+timeString
    }
    else{
      return 'No time left'
    }
    
  }
}
