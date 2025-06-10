import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Projet from '../../classes/Projet';
import { CommonModule } from '@angular/common';
import Site from '../../classes/Site';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnChanges{
  @Input() projet:Projet = new Projet(0,'',new Date(),new Date())
  dates:Date[] = []
  constructor(){
    this.dates=this.projet.dates
    console.log(this.dates.length);
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['projet']&&this.projet.dates){
      this.dates = this.projet.dates
    }
  }
  get gridTemplateColumns(): string {
    return `repeat(${this.dates.length}, 1fr)`;
  }
  isInRange(site:Site,date:Date){
    const comprise = (date>=site.dateDebut)&&(date<=site.dateFin)
    return comprise
  }
}
