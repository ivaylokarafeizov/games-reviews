import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { IReview } from 'src/app/interfaces/review';
import { environment } from 'src/environments/environment';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getComments(): Observable<IReview[]> {
    return this.httpClient.get<IReview[]>(apiURL + '/comments');
  }
}
