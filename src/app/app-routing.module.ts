import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReviewsListComponent } from './reviews/reviews-list/reviews-list.component';
import { AddReviewComponent } from './reviews/add-review/add-review.component';
import { ReviewDetailsComponent } from './reviews/review-details/review-details.component';
import { EditReviewComponent } from './reviews/edit-review/edit-review.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/',
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'games-reviews-list',
    component: ReviewsListComponent,
  },
  {
    path: 'games-reviews-list/details/:id',
    component: ReviewDetailsComponent,
  },
  {
    path: 'games-reviews-list/edit/:id',
    component: EditReviewComponent,
  },
  { path: 'add-game-review', component: AddReviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
