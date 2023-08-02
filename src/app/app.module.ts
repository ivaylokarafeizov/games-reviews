import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { RecentReviewsListComponent } from './recent-reviews-list/recent-reviews-list.component';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { ReviewDetailsComponent } from './review-details/review-details.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecentReviewsListComponent,
    ReviewsListComponent,
    AddReviewComponent,
    ReviewDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
