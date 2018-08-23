import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(protected auth: AuthService, protected router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.auth.isAuthenticated()) {
      if (this.auth.isInRoles(route.data.requiredRoles))
        return true;
      
      this.router.navigateByUrl('');
      return false;
    }

    this.auth.login();
    return true;
  }
}
