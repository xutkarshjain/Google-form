import { TestBed } from '@angular/core/testing';

import { ViewFormService } from './view-form.service';

describe('ViewFormService', () => {
  let service: ViewFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
