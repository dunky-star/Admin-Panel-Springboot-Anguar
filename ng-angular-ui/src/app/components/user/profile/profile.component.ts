import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  currentUser: User;

  constructor(private userService: UserService, private router: Router) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
   }


  logOut(){
    this.userService.logOut().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

}
