import { Component, EventEmitter, Input, Output } from '@angular/core';
import facture from '../../classes/sousclasses/Facture';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facturation-card',
  imports: [
    CommonModule
  ],
  templateUrl: './facturation-card.component.html',
  styleUrl: './facturation-card.component.scss'
})
export class FacturationCardComponent {
  @Input() facture :facture|null  = null
  @Output() closed  = new EventEmitter<void>()
  constructor(){
  }
  close(){
    this.closed.emit()
  }
  isPair(index:number){
    if(index%2==0){
      return true
    }
    else
      return false
  }
}
