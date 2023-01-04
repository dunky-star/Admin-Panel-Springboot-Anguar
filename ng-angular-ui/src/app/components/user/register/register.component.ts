import { Component} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = new User();
  errorMessage?: string;

  constructor(private userService: UserService, private router: Router) {}


  register() {
    this.userService.register(this.user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'Username is already exist';
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      complete: () => {},
    });
  }
}
