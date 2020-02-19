import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.currentToken.subscribe(token => this.loggedIn = (token.length > 1));
  }

  onLogout() {
    this.userService.logout();
    this.loggedIn = false;
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

}
