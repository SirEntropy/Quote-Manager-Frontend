import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  hide = true;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.userService.login(this.username, this.password);
    this.router.navigate(['/quotes'], {relativeTo: this.route});
  }


}
