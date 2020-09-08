import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AlertfyService } from '../alertfy.service';


@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private authSrv: AuthService, private router: Router, private alertify: AlertfyService) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        const auth = this.authSrv.getUserRole();
        if (!auth) {
            this.alertify.warning('You have not access to this page');
            this.router.navigate(['/']);
        }
        return auth;
    }
}
