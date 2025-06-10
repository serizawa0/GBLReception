import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Projet from '../../../classes/Projet';
import Site from '../../../classes/Site';
import { DaterangepickerComponent } from '../../../utilitaires/daterangepicker/daterangepicker.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-site',
  imports: [ReactiveFormsModule, DaterangepickerComponent, CommonModule],
  templateUrl: './new-site.component.html',
  styleUrl: './new-site.component.scss'
})
export class NewSiteComponent {
  @Input() projet!:Projet
  @Output() site = new EventEmitter<Site>()
  @Output() canceled = new EventEmitter<void>();
  formSite:FormGroup
  startDate:Date | null
  endDate:Date|null
  constructor(
    private fb:FormBuilder
  ){
    this.formSite = this.fb.group({
      name:'',
      code:'',
      dateDebut:'',
      dateFin:''
    })
    this.startDate = null
    this.endDate = null
  }
  valider(){
    if(this.startDate&&this.endDate){
      const site = new Site(0,this.formSite.get('name')?.value,this.formSite.get('code')?.value,this.startDate,this.endDate)
      // console.log(site);
      this.site.emit(site)
    }
    
  }
  getStart(date:Date){
    // console.log(date)
    this.startDate = date
  }
  getEnd(date:Date){
    // console.log(date)
    this.endDate = date
  }
  cancel(){
    this.canceled.emit()
  }
}
