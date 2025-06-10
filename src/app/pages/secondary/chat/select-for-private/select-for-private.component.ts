import { Component, Input } from '@angular/core';
import Utilisateur from '../../../../classes/Utilisateur';
import { DepartementsService } from '../../../../services/departements.service';
import { ChatService } from '../chat-service/chat.service';
import { LogService } from '../../../../services/log.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { log } from 'node:console';
import { LiaisonBackService } from '../../../../backService/liaison-back.service';

@Component({
  selector: 'app-select-for-private',
  imports: [
    FormsModule
  ],
  templateUrl: './select-for-private.component.html',
  styleUrl: './select-for-private.component.scss'
})
export class SelectForPrivateComponent {
  url:string
  users:Utilisateur[]
  usersBase:Utilisateur[]
  couleurs = [ '#309898','#FF9F00', '#F4631E', '#CB0404' ]
  constructor(
    private depS:DepartementsService,
    private chatS:ChatService,
    private logS:LogService,
    private router:Router,
    private liaisonBackS:LiaisonBackService
  ){
    this.url = this.liaisonBackS.url+'images/Avatars/'
    this.users = []
    this.usersBase = []
    this.depS.dataS.subscribe(data => {
      this.users = data
      this.usersBase =data
      console.log(this.users);
    })
  }
  getRandomElement<T>(arr: T[]): T {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }

  intoPrivate(receiver:Utilisateur){
    this.chatS.setCouple(this.logS.utilisateurEnCours,receiver).then(()=>{
      this.router.navigate(['home/chat/private'])
    })
  }
  recherche(event:Event){
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    if( searchTerm==''){
      this.users = this.usersBase
    }
    else{
      const r = this.usersBase.filter(user => user.name.toLowerCase().includes(searchTerm))
      this.users = r
      
    }
    
  }
}
