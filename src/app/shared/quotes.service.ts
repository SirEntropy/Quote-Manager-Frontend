import { Injectable } from '@angular/core';
import {Quote} from './quote.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  formData: Quote;
  readonly rootUrl = 'https://quotemanager-es2.conveyor.cloud/api';
  private elementId = new BehaviorSubject<number>(-1);
  currentId = this.elementId.asObservable();
  header = new HttpHeaders();

  constructor(private http: HttpClient,
              private userService: UserService) {
    let secretToken = '';
    this.userService.currentToken.subscribe(token => {
      secretToken = 'Bearer ' + token;
      this.header = this.header.set('Authorization', secretToken );
      this.header = this.header.set('Content-Type', 'application/json');
    });
  }

  changeElement(elementId: number) {
    this.elementId.next(elementId);
  }

  postQuote(formData: Quote): Observable<Quote> {
    return this.http.post<Quote>(this.rootUrl + '/quotes', formData, {
      headers: this.header
    });
  }

  getQuotes(): Observable<Array<Quote>> {
    console.log(this.header);
    return this.http.get<Array<Quote>>(this.rootUrl + '/quotes', {headers: this.header});
  }

  getQuoteById(id: number): Observable<Quote> {
   return this.http.get<Quote>(this.rootUrl + '/quotes/' + id, {headers: this.header});
  }

  updateQuote(id: number, formData: Quote): Observable<void> {
    return this.http.put<void>(this.rootUrl + '/quotes/' + id, formData, {
      headers: this.header
    });
  }

  deleteQuote(id: number): Observable<void> {
    return this.http.delete<void>(this.rootUrl + '/quotes/' + id.toString(), {headers: this.header});
  }
}
