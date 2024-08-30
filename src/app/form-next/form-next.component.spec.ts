import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNextComponent } from './form-next.component';

describe('FormNextComponent', () => {
  let component: FormNextComponent;
  let fixture: ComponentFixture<FormNextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormNextComponent]
    });
    fixture = TestBed.createComponent(FormNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
