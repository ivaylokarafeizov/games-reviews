import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../../services/reviews/reviews.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IReview } from 'src/app/interfaces/review';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css'],
})
export class EditReviewComponent implements OnInit {
  review!: IReview;
  reviewId: string | null = null;

  constructor(
    private reviewsService: ReviewsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  editForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    title: ['', [Validators.required, Validators.minLength(3)]],
    genre: ['', [Validators.required, Validators.minLength(3)]],
    review: ['', [Validators.required, Validators.minLength(50)]],
    imageUrl: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.reviewId = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.reviewsService.getReviewById(this.reviewId).subscribe((result) => {
      this.review = result;

      this.editForm = this.formBuilder.group({
        name: [result['name'], [Validators.required, Validators.minLength(5)]],
        title: [
          result['title'],
          [Validators.required, Validators.minLength(3)],
        ],
        genre: [
          result['genre'],
          [Validators.required, Validators.minLength(3)],
        ],
        review: [
          result['review'],
          [Validators.required, Validators.minLength(50)],
        ],
        imageUrl: [result['imageUrl'], [Validators.required]],
      });
    });
  }

  onEdit(): void {
    if (this.editForm.invalid) {
      return;
    }

    const editedReview: IReview = {
      name: this.editForm.value.name!,
      title: this.editForm.value.title!,
      genre: this.editForm.value.genre!,
      review: this.editForm.value.review!,
      imageUrl: this.editForm.value.imageUrl!,
      _ownerId: this.review._ownerId,
      _id: this.review._id,
    };

    const reviewId = this.activatedRoute.snapshot.paramMap.get('id');

    if (!this.reviewId) {
      return;
    }

    this.reviewsService
      .editReviewById(this.reviewId, editedReview)
      .subscribe(() => {
        this.router.navigate([`games-reviews-list/details/${reviewId}`]);
      });
  }
}
