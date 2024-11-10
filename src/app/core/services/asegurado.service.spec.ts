import { TestBed } from '@angular/core/testing';

import { AseguradoService } from './asegurado.service';

describe('AseguradoService', () => {
  let service: AseguradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AseguradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
