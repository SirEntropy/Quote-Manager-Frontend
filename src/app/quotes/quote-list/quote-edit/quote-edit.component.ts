import { Component, OnInit } from '@angular/core';
import {QuotesService} from '../../../shared/quotes.service';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Quote} from '../../../shared/quote.model';
import {NotificationService} from '../../../shared/notification.service';
import {UserService} from '../../../shared/user.service';
import {ListenService} from '../../../shared/listen.service';

@Component({
  selector: 'app-quote-edit',
  templateUrl: './quote-edit.component.html',
  styleUrls: ['./quote-edit.component.css']
})
export class QuoteEditComponent implements OnInit {
  elementID: number;
  editMode = false;
  quoteForm: FormGroup;
  exportModel: Quote;

  constructor(private quotesService: QuotesService,
              private dialogRef: MatDialogRef<QuoteEditComponent>,
              private notification: NotificationService,
              private userService: UserService,
              private listenService: ListenService) {
  }

  ngOnInit(): void {
    this.quotesService.currentId.subscribe(elementID => this.elementID = elementID);
    if (this.elementID !== -1) {
      this.editMode = true;
      this.listenService.onListenById(this.elementID);
    }
    this.initializationForm();
  }

  onSubmit() {
    if (this.quoteForm.invalid) {
      this.notification.warn(':: Form Not Valid');
    } else {
      this.exportModel = new Quote(this.quoteForm.value);
      if (this.editMode) {
        this.quotesService.updateQuote(this.elementID, this.exportModel).subscribe( data => {
          console.log('success');
          this.listenService.onListenByAll();
          this.quotesService.changeElement(-1);
        });
      } else {
        this.quotesService.postQuote(this.exportModel).subscribe(data => {
          console.log(data);
          this.listenService.onListenByAll();
        });
      }
      this.notification.success(this.editMode ? 'Successfully Updated' : 'Successfully Submitted');
      this.dialogRef.close();
    }
  }


  onClear() {
    this.quoteForm.reset();
    this.initializationForm();
  }

  onCancel() {
    this.dialogRef.close();
    this.quotesService.changeElement(-1);
  }

  initializationForm() {
    if (this.editMode) {
      this.listenService.quoteSubject.subscribe(data => {
        this.quoteForm = new FormGroup({
          quoteType: new FormControl(data.quoteType),
          quoteNumber: new FormControl(data.quoteNumber),
          contact: new FormControl(data.contact),
          task: new FormControl(data.task),
          taskType: new FormControl(data.taskType),
          dueDate: new FormControl(data.dueDate),
          ifCompleted: new FormControl(data.ifCompleted)
        });
      });
    } else {
      this.quoteForm = new FormGroup({
        quoteType: new FormControl(''),
        quoteNumber: new FormControl(0),
        contact: new FormControl(''),
        task: new FormControl(''),
        taskType: new FormControl(''),
        dueDate: new FormControl(''),
        ifCompleted: new FormControl(false)
      });
    }
  }
}
