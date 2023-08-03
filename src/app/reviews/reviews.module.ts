import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';
import { ReviewDetailsComponent } from './review-details/review-details.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { RecentReviewsListComponent } from './recent-reviews-list/recent-reviews-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { EditReviewComponent } from './edit-review/edit-review.component';

@NgModule({
  declarations: [
    ReviewsListComponent,
    ReviewDetailsComponent,
    AddReviewComponent,
    RecentReviewsListComponent,
    EditReviewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    ReviewsListComponent,
    ReviewDetailsComponent,
    AddReviewComponent,
    RecentReviewsListComponent,
  ],
})
export class ReviewsModule {}
