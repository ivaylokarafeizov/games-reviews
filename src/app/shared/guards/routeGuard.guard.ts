import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.loggedUser$.pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/login']);
          alert('Guests cannot access this page! Please login or register...');
          return false;
        }
        return true;
      })
    );
  }
}
