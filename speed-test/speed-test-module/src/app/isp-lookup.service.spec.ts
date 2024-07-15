import { TestBed } from '@angular/core/testing';

import { IspLookupService } from './isp-lookup.service';

describe('IspLookupService', () => {
  let service: IspLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IspLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
