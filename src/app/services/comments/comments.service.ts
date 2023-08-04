import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { IComment } from 'src/app/interfaces/comment';
import { environment } from 'src/environments/environment';
import { v4 as uuid } from 'uuid';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  subscription: Subscription | undefined;

  private _comments$ = new BehaviorSubject<IComment[]>([]);

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getCommentsById(id: string): Observable<IComment[]> {
    return this.httpClient.get<IComment[]>(apiURL + '/comments/' + id);
  }

  getCommentById(reviewId: string, commentId: string): Observable<IComment> {
    return this.httpClient.get<IComment>(
      `${apiURL}/comments/${reviewId}/${commentId}`
    );
  }

  createComment(comment: IComment, reviewId: string): void {
    const commentPayload = {
      ...comment,
      _ownerId: this.authService.loggedUser?._id,
      _id: uuid(),
    };

    this.subscription = this.httpClient
      .post<IComment>(apiURL + '/comments/' + reviewId, commentPayload)
      .subscribe((newComment) => {
        this._comments$.next([...this._comments$.getValue(), newComment]);
      });
  }

  deleteCommentById(commentId: string, reviewId: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${apiURL}/comments/${reviewId}/${commentId}`
    );
  }

  editCommentById(reviewId: string, commentId: string, data: IComment) {
    return this.httpClient.put<IComment>(
      `${apiURL}/comments/${reviewId}/${commentId}`,
      data
    );
  }
}
