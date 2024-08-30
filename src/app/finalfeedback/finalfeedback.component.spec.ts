import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalfeedbackComponent } from './finalfeedback.component';

describe('FinalfeedbackComponent', () => {
  let component: FinalfeedbackComponent;
  let fixture: ComponentFixture<FinalfeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalfeedbackComponent]
    });
    fixture = TestBed.createComponent(FinalfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
