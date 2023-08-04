import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { IComment } from 'src/app/interfaces/comment';
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

  getCommentsById(id: string): Observable<IComment[]> {
    return this.httpClient.get<IComment[]>(apiURL + '/comments/' + id);
  }
}
