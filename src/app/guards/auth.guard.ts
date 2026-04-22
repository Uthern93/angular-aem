import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router){}

  canActivate(): boolean {
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
