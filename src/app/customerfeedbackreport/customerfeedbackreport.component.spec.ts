import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerfeedbackreportComponent } from './customerfeedbackreport.component';

describe('CustomerfeedbackreportComponent', () => {
  let component: CustomerfeedbackreportComponent;
  let fixture: ComponentFixture<CustomerfeedbackreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerfeedbackreportComponent]
    });
    fixture = TestBed.createComponent(CustomerfeedbackreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
