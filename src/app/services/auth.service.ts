import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('currentUser')) {
            console.log('home');
            console.log(sessionStorage.getItem('currentUser'));
            return true;
        }

        this.router.navigate(['pages/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
