import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../MesServices/user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class CoachGuard implements CanActivate {
  constructor(private router: Router, private authService: UserAuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.isLoggedIn2()) {
      const role = localStorage.getItem('roles');
      if (role === '"FORMATEUR"') {
        return true;
      } else {
        return this.router.parseUrl('/login');
      }
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
