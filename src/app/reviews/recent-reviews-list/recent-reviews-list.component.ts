import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../../services/reviews/reviews.service';
import { IReview } from '../../interfaces/review';

@Component({
  selector: 'app-recent-reviews-list',
  templateUrl: './recent-reviews-list.component.html',
  styleUrls: ['./recent-reviews-list.component.css'],
})
export class RecentReviewsListComponent implements OnInit {
  isLoading: boolean = true;
  reviewsList: IReview[] = [];

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.reviewsService.getReviews().subscribe({
      next: (value) => {
        this.reviewsList = Object.values(value).slice(0, 3);
        this.isLoading = false;
      },
      error: (error) => {
        alert(error);
        this.isLoading = false;
      },
    });
  }
}
