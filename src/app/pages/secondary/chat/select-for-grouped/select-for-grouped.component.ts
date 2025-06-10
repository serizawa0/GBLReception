import { Component } from '@angular/core';
import { LiaisonBackService } from '../../../../backService/liaison-back.service';

@Component({
  selector: 'app-select-for-grouped',
  imports: [],
  templateUrl: './select-for-grouped.component.html',
  styleUrl: './select-for-grouped.component.scss'
})
export class SelectForGroupedComponent {
  groupes = []
  constructor(
    private liaisonBackS:LiaisonBackService
  ){
    this.liaisonBackS.getGroups(12).then(
      data => data.subscribe(
        res => {
          console.log(res);
          
        }
      )
    )
  }
}
