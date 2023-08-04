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
import { AddCommentComponent } from './review-details/add-comment/add-comment.component';
import { CommentsSectionComponent } from './review-details/comments-section/comments-section.component';
import { EditCommentComponent } from './review-details/edit-comment/edit-comment.component';

@NgModule({
  declarations: [
    ReviewsListComponent,
    ReviewDetailsComponent,
    AddReviewComponent,
    RecentReviewsListComponent,
    EditReviewComponent,
    AddCommentComponent,
    CommentsSectionComponent,
    EditCommentComponent,
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
