import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IReview } from '../interfaces/review';

@Component({
  selector: 'app-recent-reviews-list',
  templateUrl: './recent-reviews-list.component.html',
  styleUrls: ['./recent-reviews-list.component.css'],
})
export class RecentReviewsListComponent implements OnInit {
  reviewsList: IReview[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getReviews().subscribe({
      next: (value) => {
        this.reviewsList = Object.values(value).slice(0, 3);
      },
      error: (error) => {
        alert(error);
      },
    });
  }
}
