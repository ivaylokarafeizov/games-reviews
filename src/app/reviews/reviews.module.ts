import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';
import { ReviewDetailsComponent } from './review-details/review-details.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { RecentReviewsListComponent } from './recent-reviews-list/recent-reviews-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ReviewsListComponent,
    ReviewDetailsComponent,
    AddReviewComponent,
    RecentReviewsListComponent,
  ],
  imports: [CommonModule, FormsModule, SharedModule, RouterModule],
  exports: [
    ReviewsListComponent,
    ReviewDetailsComponent,
    AddReviewComponent,
    RecentReviewsListComponent,
  ],
})
export class ReviewsModule {}
