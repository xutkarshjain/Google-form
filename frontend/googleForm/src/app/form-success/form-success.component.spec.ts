import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSuccessComponent } from './form-success.component';

describe('FormSuccessComponent', () => {
  let component: FormSuccessComponent;
  let fixture: ComponentFixture<FormSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSuccessComponent]
    });
    fixture = TestBed.createComponent(FormSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
