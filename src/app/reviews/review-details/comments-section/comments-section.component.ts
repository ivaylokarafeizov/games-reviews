import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { IComment } from 'src/app/interfaces/comment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css'],
})
export class CommentsSectionComponent implements OnInit {
  commentsList: IComment[] | null = null;

  constructor(
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  id = this.route.snapshot.paramMap.get('id') as string;

  ngOnInit(): void {
    this.commentsService.getCommentsById(this.id).subscribe({
      next: (value) => {
        if (value !== null) {
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
}
