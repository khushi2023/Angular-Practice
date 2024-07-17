import { TestBed } from '@angular/core/testing';

import { SpeedTest6Service } from './speed-test6.service';

describe('SpeedTest6Service', () => {
  let service: SpeedTest6Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeedTest6Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
