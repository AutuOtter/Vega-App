import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(protected auth: AuthService) { }

  canActivate() {
    if (!this.auth.isAuthenticated()) {
      this.auth.login();
      return false;
    }

    return true;
  }
}
