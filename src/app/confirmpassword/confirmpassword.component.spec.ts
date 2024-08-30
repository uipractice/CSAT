import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmpasswordComponent } from './confirmpassword.component';

describe('ConfirmpasswordComponent', () => {
  let component: ConfirmpasswordComponent;
  let fixture: ComponentFixture<ConfirmpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmpasswordComponent]
    });
    fixture = TestBed.createComponent(ConfirmpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
