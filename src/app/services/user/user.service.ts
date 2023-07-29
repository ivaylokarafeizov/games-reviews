import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../../interfaces/user';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const authURL = environment.authURL;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = JSON.parse(localStorage.getItem('user') as string);
  private accessToken = this.user ? this.user.accessToken : null;

  constructor(private httpClient: HttpClient) {}

  loginUser(email: string, password: string): Observable<IUser> {
    return this.httpClient.post<IUser>(authURL + '/login', {
      email,
      password,
    });
  }

  registerUser(
    username: string,
    email: string,
    password: string
  ): Observable<IUser> {
    return this.httpClient.post<IUser>(authURL + '/register', {
      username,
      email,
      password,
    });
  }

  logout(): void {
    const headers = new HttpHeaders({
      'X-Authorization': `${this.accessToken}`,
    });

    this.httpClient.get<IUser>('/logout', {
      headers,
    });
    localStorage.clear();
  }
}
