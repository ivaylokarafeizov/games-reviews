import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IReview } from '../../interfaces/review';
import { Observable } from 'rxjs';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(private httpClient: HttpClient) {}

  getReviews(): Observable<IReview[]> {
    return this.httpClient.get<IReview[]>(apiURL + '/reviews');
  }

  getReviewById(id: string): Observable<IReview> {
    return this.httpClient.get<IReview>(apiURL + '/reviews/' + id);
  }
}
