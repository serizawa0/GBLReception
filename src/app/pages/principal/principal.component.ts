import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SocketService } from '../../backService/socket.service';
import { LogService } from '../../services/log.service';
import { DepartementsService } from '../../services/departements.service';
import { LiaisonBackService } from '../../backService/liaison-back.service';
import Utilisateur from '../../classes/Utilisateur';
import { ChatComponent } from '../secondary/chat/chat.component';

@Component({
  selector: 'app-principal',
  imports: [RouterOutlet],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent implements OnInit{
  userEnCours:Utilisateur
  cpt = 0
  constructor(
    private router:Router,
    private socketService:SocketService,
    private logService:LogService,
    private dpS:DepartementsService,
    private liaisonS:LiaisonBackService
  ){
    // console.log(this.liaisonS.getUsers());
    this.userEnCours = this.logService.utilisateurEnCours
    console.log(this.userEnCours);
    
    
    this.liaisonS.getUsers().then(element=> element.subscribe(data=> {
      this.dpS.setUsers(data.data).then(res=> {
        this.cpt++
        this.testAll()
      })
    }))
    this.liaisonS.getFactures().then(element=>element.subscribe(data => {
      this.dpS.setFactures(data.data).then(res=>{
        this.cpt++
        this.testAll()
      })
    }))
    
  }
  ngOnInit(): void {
    const userId = this.logService.user.userId
    sessionStorage.clear()
    this.socketService.connecte()
    // Enregistre l'utilisateur sur le serveur via socket
    this.socketService.register(this.logService.user.userId);
  }
  toCaisse(){
    sessionStorage.setItem('token','token')
    this.router.navigate(['home/caisse'])
  }
  toStock(){
    sessionStorage.setItem('token','token')
    this.router.navigate(['home/stock'])
  }

  toGavity(){
    this.router.navigate(['home/gravity'])
  }
  toSolaire(){
    this.router.navigate(['home/solaire'])
  }
  toProjects(){
    this.router.navigate(['home/projets'])
  }
  toChat(){
    this.router.navigate(['home/chat'])
  }
  testAll(){
    if (this.cpt == 2) {
      this.router.navigate(['home/projets']) 
    }
  }
}
