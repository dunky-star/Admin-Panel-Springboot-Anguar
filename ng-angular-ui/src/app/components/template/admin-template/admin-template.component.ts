import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css'],
})
export class AdminTemplateComponent implements OnInit {
  currentUser: User = new User();

  constructor(private userService: UserService, public router: Router) {
    this.userService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });
  }

  ngOnInit() {}

  logOut() {
    this.userService.logOut().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
