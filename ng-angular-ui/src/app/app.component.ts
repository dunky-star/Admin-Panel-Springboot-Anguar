import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Role } from './model/role';
import { User } from './model/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-angular-ui';

  currentUser: User = new User;
  isAdminPanel: boolean = false;
  constructor(private userService: UserService, private router: Router) {
    this.userService.currentUser.subscribe((data) => {
      this.currentUser = data;
      this.userChanged();
    });
  }

  userChanged() {
    if (!this.currentUser || Role.ADMIN !== this.currentUser.role) {
      this.isAdminPanel = false;
      return;
    }
    this.router.events.subscribe((evt) => {
      if (evt instanceof RoutesRecognized) {
        let roles = evt.state.root.firstChild!.data['roles'];
        if (roles && roles.indexOf(this.currentUser.role) !== -1) {
          this.isAdminPanel = true;
        }
      }
    });
  }
}
