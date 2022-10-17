import { TestBed } from '@angular/core/testing';

import { PoapFactoryService } from './poap-list.service';

describe('PoapFactoryService', () => {
  let service: PoapFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoapFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
