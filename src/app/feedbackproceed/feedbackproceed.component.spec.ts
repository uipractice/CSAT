import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackproceedComponent } from './feedbackproceed.component';

describe('FeedbackproceedComponent', () => {
  let component: FeedbackproceedComponent;
  let fixture: ComponentFixture<FeedbackproceedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackproceedComponent]
    });
    fixture = TestBed.createComponent(FeedbackproceedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
