import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormComponent } from './view-form.component';

describe('ViewFormComponent', () => {
  let component: ViewFormComponent;
  let fixture: ComponentFixture<ViewFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFormComponent]
    });
    fixture = TestBed.createComponent(ViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
