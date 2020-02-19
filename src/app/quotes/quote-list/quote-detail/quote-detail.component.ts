import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/user.service';
import {QuotesService} from '../../../shared/quotes.service';
import {Quote} from '../../../shared/quote.model';
import {ListenService} from '../../../shared/listen.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrls: ['./quote-detail.component.css']
})
export class QuoteDetailComponent implements OnInit {

  elementId: number;
  quoteItem: Quote;

  constructor(private userService: UserService,
              private quotesService: QuotesService,
              private listenService: ListenService,
              private dialogRef: MatDialogRef<QuoteDetailComponent> ) { }

  ngOnInit(): void {
    this.quotesService.currentId.subscribe(id => this.elementId = id);
    this.listenService.onListenById(this.elementId);
    this.listenService.quoteSubject.subscribe(data => {
      this.quoteItem = data;
    });
  }

  onClose() {
    this.dialogRef.close();
    this.quotesService.changeElement(-1);
  }

}
