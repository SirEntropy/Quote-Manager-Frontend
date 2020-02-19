import { Injectable } from '@angular/core';
import {Quote} from './quote.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  formData: Quote;
  listData: Quote[];
  readonly rootUrl = 'https://localhost:44380/api';

  constructor(private http: HttpClient) { }

  postQuote(formData: Quote) {
    return this.http.post(this.rootUrl + '/quotes', formData);
  }

  getQuotes() {
    this.http.get(this.rootUrl + '/quotes').toPromise().then(res => this.listData = res as Quote[]);
  }
}
