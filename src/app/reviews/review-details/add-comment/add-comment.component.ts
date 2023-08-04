import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IComment } from 'src/app/interfaces/comment';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
})
export class AddCommentComponent {
  isLoading: boolean = false;

  constructor(
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  reviewId = this.route.snapshot.paramMap.get('id') as string;

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;

    const formData: IComment = {
      name: form.value.name,
      comment: form.value.comment,
      _ownerId: this.authService.loggedUser?._id as string,
      _id: uuid(),
    };

    if (
      (!formData.name || formData.name.trim().length === 0) &&
      (!formData.comment || formData.comment.trim().length === 0)
    ) {
      alert('Please enter data in the fields!');
      form.reset();
      return;
    }

    this.commentsService.createComment(formData, this.reviewId);
    this.router.navigate(['/games-reviews-list/details', this.reviewId]);
  }
}
