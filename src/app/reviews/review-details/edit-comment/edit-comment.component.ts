import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IComment } from '../../../interfaces/comment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css'],
})
export class EditCommentComponent implements OnInit {
  isLoading: boolean = false;
  comment!: IComment;
  commentId = this.activatedRoute.snapshot.paramMap.get('id') as string;
  reviewId = this.activatedRoute.snapshot.paramMap.get('reviewId') as string;

  constructor(
    private commentsService: CommentsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  editForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    comment: ['', [Validators.required, Validators.minLength(5)]],
  });

  ngOnInit(): void {
    this.commentsService
      .getCommentById(this.reviewId, this.commentId)
      .subscribe((result) => {
        this.comment = result;
        this.editForm = this.formBuilder.group({
          name: [
            result['name'],
            [Validators.required, Validators.minLength(5)],
          ],
          comment: [
            result['comment'],
            [Validators.required, Validators.minLength(5)],
          ],
        });
      });
  }

  onEditComment(): void {
    if (this.editForm.invalid) {
      return;
    }

    this.isLoading = true;

    const editedComment: IComment = {
      name: this.editForm.value.name!,
      comment: this.editForm.value.comment!,
      _ownerId: this.comment._ownerId,
      _id: this.comment._id,
    };

    if (
      (!editedComment.name || editedComment.name.trim().length === 0) &&
      (!editedComment.comment || editedComment.comment.trim().length === 0)
    ) {
      alert('Please enter data in the fields!');
      this.editForm.reset();
      return;
    }

    if (!this.reviewId) {
      return;
    }

    this.commentsService
      .editCommentById(this.reviewId, this.commentId, editedComment)
      .subscribe(() => {
        this.router.navigate([`games-reviews-list/details/${this.reviewId}`]);
      });
  }
}
