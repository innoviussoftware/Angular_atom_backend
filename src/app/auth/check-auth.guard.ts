import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
// export class OnlyLoggedInUserGuard implements CanActivate {
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     return true;
//   }
// }
export class CheckAuth implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {};

  canActivate() {
    console.log("OnlyLoggedInUsers");
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
