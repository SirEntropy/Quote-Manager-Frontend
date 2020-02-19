import {Component, OnInit, ViewChild} from '@angular/core';
import {Quote} from '../../shared/quote.model';
import {QuotesService} from '../../shared/quotes.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {QuoteEditComponent} from './quote-edit/quote-edit.component';
import {UserService} from '../../shared/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ListenService} from '../../shared/listen.service';
import {NotificationService} from '../../shared/notification.service';
import {QuoteDetailComponent} from './quote-detail/quote-detail.component';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['quoteType', 'quoteNumber', 'contact', 'task', 'dueDate', 'taskType', 'actions'];
  searchKey: string;
  quotes: Array<Quote>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private quotesService: QuotesService,
              private dialog: MatDialog,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private listenService: ListenService,
              private notification: NotificationService) { }

  ngOnInit(): void {
    this.listenService.onListenByAll();
    this.listenService.quotesSubject.subscribe(data => {
      this.quotes = data;
      this.dataSource = new MatTableDataSource(this.quotes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onView(id: number) {
    this.quotesService.changeElement(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '60%';
    this.dialog.open(QuoteDetailComponent, dialogConfig);
  }

  onEdit(elementId: number) {
    this.quotesService.changeElement(elementId);
    this.onCreate();
  }

  onDelete(id: number) {
    if (confirm('This record will be permanently removed, are you sure ?')) {
      this.listenService.onListenDelete(id);
      this.listenService.quoteSubject.subscribe(data => {
        console.log('success');
        this.listenService.onListenByAll();
      });
      this.notification.success(':: Delete Completed');
    }

  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '60%';
    this.dialog.open(QuoteEditComponent, dialogConfig);
  }


}
