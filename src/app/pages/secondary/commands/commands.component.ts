import { Component, OnInit } from '@angular/core';
import Panier from '../../../classes/Panier';
import { LiaisonBackService } from '../../../backService/liaison-back.service';
import { SocketService } from '../../../backService/socket.service';
import { LogService } from '../../../services/log.service';

@Component({
  selector: 'app-commands',
  imports: [],
  templateUrl: './commands.component.html',
  styleUrl: './commands.component.scss'
})
export class CommandsComponent implements OnInit{
  commands:Panier[]
  private intervalId: any;
  constructor(
    private liaisonService:LiaisonBackService,
    private socketService:SocketService,
    private logService:LogService
  ){

    this.commands = []
  }
  ngOnInit(): void {
    this.socketService.onGravityCommand().subscribe( panier => {
      this.commands = panier
    } )
  }
  updateCommands(){

  }
}
