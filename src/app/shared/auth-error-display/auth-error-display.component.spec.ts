import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthErrorDisplayComponent } from './auth-error-display.component';

describe('AuthErrorDisplayComponent', () => {
  let component: AuthErrorDisplayComponent;
  let fixture: ComponentFixture<AuthErrorDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthErrorDisplayComponent]
    });
    fixture = TestBed.createComponent(AuthErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
