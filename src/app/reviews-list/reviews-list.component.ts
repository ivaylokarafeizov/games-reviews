import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IReview } from '../interfaces/review';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.css'],
})
export class ReviewsListComponent implements OnInit {
  reviewsList: IReview[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getReviews().subscribe({
      next: (value) => {
        this.reviewsList = Object.values(value);
      },
      error: (error) => {
        alert(error);
      },
    });
  }
}
