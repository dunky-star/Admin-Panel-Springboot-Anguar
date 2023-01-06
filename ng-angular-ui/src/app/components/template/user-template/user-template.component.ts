import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-template',
  templateUrl: './user-template.component.html',
  styleUrls: ['./user-template.component.css'],
})
export class UserTemplateComponent  {
  currentUser: User = new User;

  constructor(private userService: UserService, private router: Router) {
    this.userService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });
  }



  logOut() {
    this.userService.logOut().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.ADMIN;
  }
}
