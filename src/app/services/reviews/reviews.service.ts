import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IReview } from '../../interfaces/review';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { v4 as uuid } from 'uuid';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class ReviewsService implements OnDestroy {
  subscription: Subscription | undefined;

  private _reviews$ = new BehaviorSubject<IReview[]>([]);

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getReviews(): Observable<IReview[]> {
    return this.httpClient.get<IReview[]>(apiURL + '/reviews');
  }

  getReviewById(id: string): Observable<IReview> {
    return this.httpClient.get<IReview>(apiURL + '/reviews/' + id);
  }

  createReview(review: IReview): void {
    const reviewPayload = {
      ...review,
      _ownerId: this.authService.loggedUser?._id,
      _id: uuid(),
    };

    this.subscription = this.httpClient
      .post<IReview>(apiURL + '/reviews', reviewPayload)
      .subscribe((newReview) => {
        this._reviews$.next([...this._reviews$.getValue(), newReview]);
      });
  }
}
