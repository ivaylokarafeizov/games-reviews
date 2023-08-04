import { Router, UrlTree } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements OnDestroy {
  subscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let isAuth: boolean = false;
    this.subscription = this.authService.loggedUser$.subscribe((user) => {
      isAuth = !!user;
    });
    if (isAuth) {
      return true;
    }
    alert('You are not authorized to access this page!');
    return this.router.createUrlTree(['/login']);
  }
}
