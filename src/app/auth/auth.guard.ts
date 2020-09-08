import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { AlertfyService } from '../alertfy.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authSrv: AuthService, private router: Router, private aletfy: AlertfyService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const auth = this.authSrv.getAuth();
    if (!auth) {
      this.aletfy.warning('You have to login to access this page');
      this.router.navigate(['/']);
    }
    return auth;
  }
}
