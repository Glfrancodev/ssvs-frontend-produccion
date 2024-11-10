import { TestBed } from '@angular/core/testing';

import { CupoService } from './cupo.service';

describe('CupoService', () => {
  let service: CupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
