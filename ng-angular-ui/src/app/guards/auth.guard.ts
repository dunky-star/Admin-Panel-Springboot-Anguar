import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {
  currentUser: User = new User;
  constructor(private router: Router, private userService: UserService){
    this.userService.currentUser.subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
    });
  }

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot){
    if(this.currentUser){
      //check if route is restricted by role...
      console.log(route.data['roles']);
      if(route.data['roles'] && route.data['roles'].indexOf(this.currentUser.role) === -1){
        this.router.navigate(['/401']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
