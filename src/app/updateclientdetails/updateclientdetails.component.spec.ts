import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateclientdetailsComponent } from './updateclientdetails.component';

describe('UpdateclientdetailsComponent', () => {
  let component: UpdateclientdetailsComponent;
  let fixture: ComponentFixture<UpdateclientdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateclientdetailsComponent]
    });
    fixture = TestBed.createComponent(UpdateclientdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
