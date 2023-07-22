import { Component, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IReview } from '../interfaces/review';
import { Location } from '@angular/common';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.css'],
})
export class ReviewDetailsComponent implements AfterViewInit {
  review: IReview[] = [];

  constructor(private apiService: ApiService, private location: Location) {}

  getReviewDetailsId(): string {
    return this.location.path().split('details/')[1];
  }

  ngAfterViewInit(): void {
    this.apiService.getReviewById(this.getReviewDetailsId()).subscribe({
      next: (value) => {
        this.review = Object.values(value);
      },
      error: (error) => {
        alert(error);
      },
    });
  }
}
