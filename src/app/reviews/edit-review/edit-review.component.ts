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
  isLoading: boolean = false;
  imageUrlPattern = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)$/;
  review!: IReview;
  reviewId = this.activatedRoute.snapshot.paramMap.get('id') as string;

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

    this.isLoading = true;

    const editedReview: IReview = {
      name: this.editForm.value.name!,
      title: this.editForm.value.title!,
      genre: this.editForm.value.genre!,
      review: this.editForm.value.review!,
      imageUrl: this.editForm.value.imageUrl!,
      _ownerId: this.review._ownerId,
      _id: this.review._id,
    };

    if (
      (!editedReview.name || editedReview.name.trim().length === 0) &&
      (!editedReview.title || editedReview.title.trim().length === 0) &&
      (!editedReview.genre || editedReview.genre.trim().length === 0) &&
      (!editedReview.review || editedReview.review.trim().length === 0) &&
      (!editedReview.imageUrl || editedReview.imageUrl.trim().length === 0)
    ) {
      alert('Please enter data in the fields!');
      this.editForm.reset();
      return;
    }

    if (!this.imageUrlPattern.test(editedReview.imageUrl)) {
      alert('Please enter a valid image url!');
      return;
    }

    if (!this.reviewId) {
      return;
    }

    this.reviewsService
      .editReviewById(this.reviewId, editedReview)
      .subscribe(() => {
        this.router.navigate([`games-reviews-list/details/${this.reviewId}`]);
      });
  }
}
