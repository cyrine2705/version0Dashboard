import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken) {
      this.router.navigate(['/login']);
      return false;
    }
  
    try {
      const decodedToken: any = jwt_decode(jwtToken);
      const currentTime = Math.floor(Date.now() / 1000);
  
      if (decodedToken.exp && decodedToken.exp > currentTime) {
        // The token has not expired yet.
        return true;
      } else {
        // The token has expired or does not have an expiration time.
        localStorage.removeItem('jwtToken');
        this.router.navigate(['/login']);
        return false;
      }
    } catch (e) {
      // There was an error decoding the token.
      localStorage.removeItem('jwtToken');
      this.router.navigate(['/login']);
      return false;
    }
}














}
