import { TestBed } from '@angular/core/testing';

import { PoapService } from './poap.service';

describe('PoapService', () => {
  let service: PoapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
