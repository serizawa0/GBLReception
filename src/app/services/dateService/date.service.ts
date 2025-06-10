import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
  getAllDaysinMonth(year:number,month:number){
    const dates:Date[] = []
    const date = new Date(year,month,1)

    while (date.getMonth()===month) {
      dates.push(new Date(date))
      date.setDate(date.getDate()+1)
    }
    return dates
  }
}
