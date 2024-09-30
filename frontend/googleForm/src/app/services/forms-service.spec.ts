import { TestBed } from '@angular/core/testing';

import { FormsListService } from './forms-service';

describe('FormsListService', () => {
  let service: FormsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
