import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';
import { AddReviewComponent } from './add-review/add-review.component';

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
  { path: 'games-reviews-list', component: ReviewsListComponent },
  { path: 'add-game-review', component: AddReviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
