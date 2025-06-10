import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DateService } from '../../services/dateService/date.service';
import { CommonModule } from '@angular/common';
import { log } from 'node:console';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import CoupleDates from '../../classes/sousclasses/CoupleDates';

@Component({
  selector: 'app-daterangepicker',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './daterangepicker.component.html',
  styleUrl: './daterangepicker.component.scss'
})
export class DaterangepickerComponent {
  @Output() dateEmitter = new EventEmitter<Date>()
  @Input() day:Date|null = null
  isShifted = false;
  // @ViewChild('maDiv') maDiv!: ElementRef<HTMLDivElement>;
  jours = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
  mois = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aôut','Septembre','Octobre','Novembre','Décembre']
  today = new Date()
  presentMonth:Date[]
  prevMonth:Date[]
  nextMonth:Date[]
  days:Date[]
  startDate: Date | null = null;
  endDate: Date | null = null;
  formYearAndMonth:FormGroup
  monthSelected:number
  formState:boolean = false
  date:Date | null
  constructor(
    private dS:DateService,
    private fb:FormBuilder
  ){
    // console.log(this.jours[this.today.getDay()]);
    if(!this.day){
      this.today = new Date()
    }
    else{
      this.today = this.day
    }
    this.days = []
    this.presentMonth = this.dS.getAllDaysinMonth(this.today.getFullYear(),this.today.getMonth())
    const tmp = new Date(this.presentMonth[0])
    const prev = new Date(this.presentMonth[0]) 
    prev.setDate(prev.getDate() - 1)
    this.prevMonth = this.dS.getAllDaysinMonth(prev.getFullYear(),prev.getMonth())
    const next = new Date(this.presentMonth[this.presentMonth.length - 1])
    next.setDate(next.getDate() + 1)
    this.formYearAndMonth = this.fb.group({
      year:this.today.getFullYear(),
      month:this.today.getMonth()
    })
    this.monthSelected = this.today.getMonth()
    
    this.nextMonth = this.dS.getAllDaysinMonth(next.getFullYear(),next.getMonth())
    this.updateCalendar(this.today)
    this.date = null
  }
  updateCalendar(presentDay:Date){
    this.presentMonth = this.dS.getAllDaysinMonth(presentDay.getFullYear(),presentDay.getMonth())
    
    const prev = new Date(this.presentMonth[0])
    prev.setDate(prev.getDate() - 1)
    this.prevMonth = this.dS.getAllDaysinMonth(prev.getFullYear(),prev.getMonth())
    const next = new Date(this.presentMonth[this.presentMonth.length - 1])
    next.setDate(next.getDate() + 1)
    this.nextMonth = this.dS.getAllDaysinMonth(next.getFullYear(),next.getMonth())
    // console.log(this.presentMonth[0]);
    this.updateAffichage(this.presentMonth,this.prevMonth,this.nextMonth)
    // console.log(this.prevMonth[0])
    // console.log(this.nextMonth[0])
    this.formYearAndMonth.setValue({year:presentDay.getFullYear(),month:presentDay.getMonth()})
  }
  updateAffichage(presentMonth:Date[], prevMonth:Date[], nextMonth:Date[]){
    this.days = presentMonth.map(d=> new Date(d))
    let cpt = 1
    while (this.days[0].getDay()!=0) {
      this.days.unshift(new Date(prevMonth[prevMonth.length-cpt]))
      cpt++
    }
    cpt = 0
    while(this.days[this.days.length-1].getDay()!=6){
      this.days.push(new Date(nextMonth[cpt]))
      cpt++;
    }

  }
  toPrevMonth(){
    const previousDay = new Date(this.prevMonth[0])
    // previousDay.setDate(this.days[0].getDate()-1)
    this.updateCalendar(previousDay)
  }
  toNextMonth(){
    const nextDay = new Date(this.nextMonth[0])
    // nextDay.setDate(this.days[this.days.length-1].getDate()+1)
    this.updateCalendar(nextDay)
  }

  onDateClick(date: Date): void {
    this.date = date
    this.dateEmitter.emit(this.date)
  }
  isInRange(date: Date) {
  }  
  selectMonth(month:number){
    this.monthSelected = month
  }
  validateMonthAndYear(){
    
  }
  isSelected(month:number){
    return this.monthSelected == month
  }
  toggle() {
    this.isShifted = !this.isShifted;
  }
  validate(date:Date){
       
  }
  changeOnForm(){
    const newDate = new Date(this.formYearAndMonth.get('year')?.value,this.formYearAndMonth.get('month')?.value)
    this.updateCalendar(newDate)
  }
}
