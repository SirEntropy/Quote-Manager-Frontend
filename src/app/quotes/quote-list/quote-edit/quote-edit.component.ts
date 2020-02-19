import { Component, OnInit } from '@angular/core';
import {QuotesService} from '../../shared/quotes.service';
import {Form, NgForm} from '@angular/forms';

@Component({
  selector: 'app-quote-edit',
  templateUrl: './quote-edit.component.html',
  styleUrls: ['./quote-edit.component.css']
})
export class QuoteEditComponent implements OnInit {

  constructor(private quotesService: QuotesService) { }

  ngOnInit(): void {
  }

  resetForm(form?: NgForm) {
    if (form !== null) {
      form.resetForm();
    }
    this.quotesService.formData = {
      quoteID: null,
      quoteType: '',
      quoteNumber: 0,
      task: '',
      taskType: '',
      dueDate: '',
      contact: '',
      ifCompleted: false
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.quoteID === null) {
      this.addQuote(form);
    } else {
      this. updateQuote (form);
    }
  }

  addQuote (form: NgForm) {
    this
  }

}
