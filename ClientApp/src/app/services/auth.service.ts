import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import * as jwt_decode from 'jwt-decode';

(window as any).global = window;

@Injectable()
export class AuthService {
  private roles: string[] = [];

  auth0 = new auth0.WebAuth({
    clientID: '4cCUVjPCey4F3ODmyKL2kW55x7Ecvag3',
    domain: 'vega-app.auth0.com',
    responseType: 'token id_token',
    audience: 'https://vega.api.com',
    redirectUri: 'https://localhost:5001/callback',
    scope: 'openid email profile app_metadata user_metadata'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/vehicles']);
      } else if (err) {
        this.router.navigate(['/vehicles']);
        console.log(`Error authenticating: ${err}`);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    
    this.readUserFromLocalStorage();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.roles = [];

    // Go back to the home route
    this.router.navigate(['/vehicles']);
    console.log("You have been logged out.");
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public readUserFromLocalStorage() {
    var token = localStorage.getItem('id_token');
    
    if(token !== "undefined") {
      var decodedToken = jwt_decode(token);
      this.roles = decodedToken['https://vega-app.awilson.com/roles'];
    }
  }
  
  public isInRoles(roles: string[]): boolean {
    // If there are no roles provided, return true.
    if (!roles) return true;

    // Check if the user has a required role.
    for(let role of this.roles) {
      if (this.roles && roles.includes(role))
        return true;
    }

    return false;
  }
}