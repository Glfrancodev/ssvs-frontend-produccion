import { TestBed } from '@angular/core/testing';

import { PermisoAusenciaService } from './permiso-ausencia.service';

describe('PermisoAusenciaService', () => {
  let service: PermisoAusenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisoAusenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
