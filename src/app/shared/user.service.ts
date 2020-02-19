import { Injectable } from '@angular/core';
import {User} from './user.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {rejects} from 'assert';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootUrl = 'https://quotemanager-es2.conveyor.cloud/api';
  user: User;
  private securedToken = new BehaviorSubject<string>('');
  private token: string;
  currentToken = this.securedToken.asObservable();
  loggedin = false;

  constructor(private http: HttpClient) { }

  login(uname: string, pass: string) {
    this.http.post(this.rootUrl + '/login/' + uname + '/' + pass, null).subscribe(res => {
      this.token = res as string;
      this.securedToken.next(this.token);
      console.log(this.token);
      this.loggedin = true;
    });
  }

  register(user: User) {
    this.http.post(this.rootUrl + '/Register/', user).subscribe(res => {
      this.token = res as string;
      this.securedToken.next(this.token);
      console.log(this.token);
      this.loggedin = true;
    });
  }

  logout() {
    this.token = '';
    this.loggedin = false;
  }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.loggedin), 1000);
      });
    return promise;
  }
}
