import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../backService/socket.service';
import { LogService } from '../../../services/log.service';
import PanierSolaire from '../../../classes/PanierSolaire';

@Component({
  selector: 'app-solaire-commands',
  imports: [],
  templateUrl: './solaire-commands.component.html',
  styleUrl: './solaire-commands.component.scss'
})
export class SolaireCommandsComponent implements OnInit{
  commands:PanierSolaire[]
  constructor(
    private socketService:SocketService,
    private logService:LogService
  ){
    this.commands = []
  }
  ngOnInit(): void {
    this.socketService.onSolaireCommand().subscribe(
      data => {
        this.commands = data
      }
    )
  }
}
