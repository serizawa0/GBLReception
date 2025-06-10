import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { log } from 'console';
import Projet from '../../../classes/Projet';
import { DaterangepickerComponent } from '../../../utilitaires/daterangepicker/daterangepicker.component';
import CoupleDates from '../../../classes/sousclasses/CoupleDates';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-projet',
  imports: [
    ReactiveFormsModule,DaterangepickerComponent,CommonModule
  ],
  templateUrl: './new-projet.component.html',
  styleUrl: './new-projet.component.scss'
})
export class NewProjetComponent {
  @Output() newProjet = new EventEmitter<Projet>()
  @Output() canceled = new EventEmitter<void>();
  @Output() messageEnvoye = new EventEmitter<string>();
  coupleDates:CoupleDates
  formProjet:FormGroup
  startDate:Date | null
  endDate:Date | null
  constructor(
    private fb:FormBuilder
  ){
    this.formProjet = this.fb.group({
      name:'',
      dateDebut:'',
      dateFin:''
    })
    this.coupleDates = new CoupleDates()
    this.startDate = null
    this.endDate = null
  }

  valider(){
    if (this.startDate&&this.endDate) {
     const newP = new Projet(0,this.formProjet.get('name')?.value,this.startDate,this.endDate) 
     this.newProjet.emit(newP)
    }
  }
  cancel() {
    this.canceled.emit();
  }

  getDates(coupleDates:CoupleDates){
    console.log(coupleDates);
    
  }
  getStart(date:Date){
    // console.log(date)
    this.startDate = date
  }
  getEnd(date:Date){
    // console.log(date)
    this.endDate = date
  }
}
