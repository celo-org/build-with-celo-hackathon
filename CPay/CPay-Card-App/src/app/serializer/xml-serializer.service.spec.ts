import { TestBed } from '@angular/core/testing';

import { XmlSerializerService } from './xml-serializer.service';

describe('XmlSerializerService', () => {
  let service: XmlSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmlSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
