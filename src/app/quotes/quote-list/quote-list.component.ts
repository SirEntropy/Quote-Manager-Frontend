import { Component, OnInit } from '@angular/core';
import {Quote} from '../../shared/quote.model';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {
  dataSource: Quote[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
