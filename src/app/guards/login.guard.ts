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
export class LoginGuard implements CanActivate {
  constructor(private authService: UserAuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn2()) {
      const role = localStorage.getItem('roles');
      if (role === '"ADMINISTRATEUR"') {
        return this.router.parseUrl('/admin');
      } else if (role === '"ETUDIANT"') {
        return this.router.parseUrl('/student');
      } else if (role === '"FORMATEUR"') {
        return this.router.parseUrl('/coach');
      }
      {
        return this.router.parseUrl('');
      }
    }
    return true;
  }
}
