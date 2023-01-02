import { Component } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = new User();
  errorMessage?: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.userService.login(this.user).subscribe({
      next: (data) => {
        data.router.navigate(['/profile']).bind(data);
      },
      error: (err) => {
        err.errorMessage = 'Username or password is incorrect.';
      },
    });
  }
}
