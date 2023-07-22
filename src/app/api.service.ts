import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { IReview } from './interfaces/review';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  // http://localhost:3030/jsonstore/games-reviews/reviews/512da504-505b-4aca-b9f0-77f302dd29a8
  getReviews() {
    return this.httpClient.get<IReview>(apiURL + '/reviews');
  }

  getReviewById(id: string) {
    return this.httpClient.get<IReview>(apiURL + '/reviews/' + id);
  }
}
