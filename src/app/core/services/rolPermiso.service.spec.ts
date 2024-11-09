import { TestBed } from '@angular/core/testing';

import { RolPermisoService } from './rolPermiso.service';

describe('rolPermisoService', () => {
  let service: RolPermisoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolPermisoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
