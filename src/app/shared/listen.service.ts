import { Injectable } from '@angular/core';
import {QuotesService} from './quotes.service';
import {Subject} from 'rxjs';
import {Quote} from './quote.model';

@Injectable({
  providedIn: 'root'
})
export class ListenService {

  quoteSubject = new Subject<Quote>();
  quotesSubject = new Subject<Quote[]>();
  constructor(private quotesService: QuotesService) { }

  onListenByAll() {
    this.quotesService.getQuotes().subscribe(data => this.quotesSubject.next(data));
  }

  onListenById(id: number) {
    this.quotesService.getQuoteById(id).subscribe(data => this.quoteSubject.next(data));
  }

  onListenDelete(id: number) {
    this.quotesService.deleteQuote(id).subscribe(() => this.quoteSubject.next());
  }

}



