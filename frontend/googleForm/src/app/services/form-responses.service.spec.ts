import { TestBed } from '@angular/core/testing';

import { FormResponsesService } from './form-responses.service';

describe('FormResponsesService', () => {
  let service: FormResponsesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormResponsesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
