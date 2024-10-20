import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFooterComponent } from './form-footer.component';

describe('FormFooterComponent', () => {
  let component: FormFooterComponent;
  let fixture: ComponentFixture<FormFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFooterComponent]
    });
    fixture = TestBed.createComponent(FormFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
