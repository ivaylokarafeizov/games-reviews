import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReviewsService } from '../services/reviews/reviews.service';
import { Router } from '@angular/router';
import { IReview } from '../interfaces/review';
import { AuthService } from '../services/auth/auth.service';
import { v4 as uuid } from 'uuid';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
})
export class AddReviewComponent {
  isLoading: boolean = false;

  constructor(
    private reviewsService: ReviewsService,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;

    const formData: IReview = {
      name: form.value.name,
      title: form.value.title,
      genre: form.value.genre,
      review: form.value.review,
      imageUrl: form.value.imageUrl,
      _ownerId: this.authService.loggedUser?._id as string,
      _id: uuid(),
    };

    if (
      (!formData.name || formData.name.trim().length === 0) &&
      (!formData.title || formData.title.trim().length === 0) &&
      (!formData.genre || formData.genre.trim().length === 0) &&
      (!formData.review || formData.review.trim().length === 0) &&
      (!formData.imageUrl || formData.imageUrl.trim().length === 0)
    ) {
      alert('Please enter data in the fields!');
      form.reset();
      return;
    }

    this.reviewsService.createReview(formData);
    this.router.navigate(['/games-reviews-list']);
  }
}
