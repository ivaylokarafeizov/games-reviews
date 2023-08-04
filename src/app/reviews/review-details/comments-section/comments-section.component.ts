import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IComment } from 'src/app/interfaces/comment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css'],
})
export class CommentsSectionComponent implements OnInit {
  commentsList: IComment[] | undefined = undefined;
  loggedUserId = this.authService.loggedUser?._id as string;

  constructor(
    private commentsService: CommentsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  reviewId = this.route.snapshot.paramMap.get('id') as string;

  ngOnInit(): void {
    this.commentsService.getCommentsById(this.reviewId).subscribe({
      next: (value) => {
        if (value !== undefined) {
          this.commentsList = Object.values(value);
        } else {
          this.commentsList = [];
        }
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  onDeleteComment(id?: string): void {
    if (id) {
      this.commentsService.deleteCommentById(id, this.reviewId).subscribe({
        next: () => {
          this.commentsList = this.commentsList?.filter(
            (comment) => comment._id !== id
          );
        },
        error: (error) => {
          alert(error);
        },
      });
    } else {
      alert('No id provided. Cannot delete the review!');
      return;
    }
  }

  onEditComment(id?: string): void {
    if (id) {
      this.router.navigate(['games-reviews-list/edit-comment/', id]);
    } else {
      alert('No id provided. Cannot edit the review!');
      return;
    }
  }

  isOwner(comment: IComment): boolean {
    return this.loggedUserId !== null && this.loggedUserId === comment._ownerId;
  }
}
