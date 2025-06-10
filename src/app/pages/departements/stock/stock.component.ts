import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  imports: [],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent implements OnInit{
  constructor(){

  }
  ngOnInit(): void {
    sessionStorage.clear()
  }
} 
