import { TestBed } from '@angular/core/testing';

import { MedicoEspecialidadService } from './medico-especialidad.service';

describe('MedicoEspecialidadService', () => {
  let service: MedicoEspecialidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicoEspecialidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
