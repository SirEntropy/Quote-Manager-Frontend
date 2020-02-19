import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user.model';
import {UserService} from '../shared/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = '';
  password = '';
  confirm = '';
  hide = true;
  chide = true;
  user = new User();
  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onRegister() {
    if (this.password !== this.confirm) {
      alert('Passwords do not match');
    } else {
      this.user.USERNAME = this.username;
      this.user.USERPASSWORD = this.password;
      this.user.CONFIRMPASS = this.confirm;
      this.userService.register(this.user);
      this.router.navigate(['/quotes'], {relativeTo: this.route});
    }
  }
}
