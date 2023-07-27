import { BehaviorSubject, catchError, finalize, tap, throwError } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _loggedUser$ = new BehaviorSubject<IUser | null>(null);
  loggedUser$ = this._loggedUser$.asObservable();

  isLoading: boolean = false;
  httpError: string = '';

  constructor(private apiService: ApiService, private router: Router) {
    const loggedUser = JSON.parse(localStorage.getItem('user') as string);
    this._loggedUser$.next(loggedUser as IUser);
  }

  login(email: string, password: string) {
    this.isLoading = true;
    return this.apiService.loginUser(email, password).pipe(
      finalize(() => (this.isLoading = false)),
      catchError((error: HttpErrorResponse) => {
        this.setHttpError(error);
        return throwError(() => error);
      }),
      tap((response) => {
        this.resetHttpError();
        this.setLocalUser(response);
      })
    );
  }

  register(username: string, email: string, password: string) {
    this.isLoading = true;
    return this.apiService.registerUser(username, email, password).pipe(
      finalize(() => (this.isLoading = false)),
      catchError((error: HttpErrorResponse) => {
        this.setHttpError(error);
        return throwError(() => error);
      }),
      tap((response) => {
        this.resetHttpError();
        this.setLocalUser(response);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  setHttpError(error: HttpErrorResponse) {
    this.httpError = error.error.message;
  }

  resetHttpError(): void {
    this.httpError = '';
  }

  logout(): void {
    this._loggedUser$.next(null);
    this.apiService.logout();
    this.router.navigate(['/login']);
  }

  setLocalUser(user: IUser): void {
    this._loggedUser$.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  get loggedUser(): IUser | null {
    return this._loggedUser$.getValue();
  }
}
