import { Component, AfterViewInit } from '@angular/core';
import { ReviewsService } from '../services/reviews/reviews.service';
import { IReview } from '../interfaces/review';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.css'],
})
export class ReviewDetailsComponent implements AfterViewInit {
  isLoading: boolean = true;
  review: IReview[] = [];

  constructor(
    private reviewsService: ReviewsService,
    private route: ActivatedRoute
  ) {}

  id = this.route.snapshot.paramMap.get('id') as string;

  ngAfterViewInit(): void {
    this.reviewsService.getReviewById(this.id).subscribe({
      next: (value) => {
        this.review = Object.values(value);
        this.isLoading = false;
      },
      error: (error) => {
        alert(error);
        this.isLoading = false;
      },
    });
  }
}
