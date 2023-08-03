import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentReviewsListComponent } from './recent-reviews-list.component';

describe('RecentReviewsListComponent', () => {
  let component: RecentReviewsListComponent;
  let fixture: ComponentFixture<RecentReviewsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentReviewsListComponent]
    });
    fixture = TestBed.createComponent(RecentReviewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
