import { Component, AfterViewInit } from '@angular/core';
import { ReviewsService } from '../../services/reviews/reviews.service';
import { IReview } from '../../interfaces/review';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.css'],
})
export class ReviewDetailsComponent implements AfterViewInit {
  isLoading: boolean = true;
  review: IReview | null = null;
  loggedUserId = this.authService.loggedUser?._id as string;
  reviewOwnerId: string | null = null;

  constructor(
    private reviewsService: ReviewsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  id = this.route.snapshot.paramMap.get('id') as string;

  ngAfterViewInit(): void {
    this.reviewsService.getReviewById(this.id).subscribe({
      next: (value) => {
        this.review = value;
        this.reviewOwnerId = value._ownerId;
        this.isLoading = false;
      },
      error: (error) => {
        alert(error);
        this.isLoading = false;
      },
    });
  }

  onDeleteReview(id?: string): void {
    if (id) {
      this.reviewsService.deleteReviewById(id).subscribe({
        next: () => {
          this.router.navigate(['/games-reviews-list']);
          this.isLoading = false;
        },
        error: (error) => {
          alert(error);
          this.isLoading = false;
        },
      });
    } else {
      alert('No id provided. Cannot delete the review!');
      return;
    }
  }

  onEditReview(reviewId: string | undefined) {
    if (reviewId) {
      this.router.navigate(['games-reviews-list/edit', reviewId]);
    } else {
      alert('No id provided. Cannot edit the review!');
      return;
    }
  }

  isAuthorized(): boolean {
    return (
      this.loggedUserId !== null && this.loggedUserId === this.reviewOwnerId
    );
  }

  isOwner(): boolean {
    return (
      this.loggedUserId !== null && this.loggedUserId !== this.reviewOwnerId
    );
  }
}
