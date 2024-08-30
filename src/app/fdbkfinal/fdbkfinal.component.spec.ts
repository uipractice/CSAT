import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdbkfinalComponent } from './fdbkfinal.component';

describe('FdbkfinalComponent', () => {
  let component: FdbkfinalComponent;
  let fixture: ComponentFixture<FdbkfinalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdbkfinalComponent]
    });
    fixture = TestBed.createComponent(FdbkfinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
