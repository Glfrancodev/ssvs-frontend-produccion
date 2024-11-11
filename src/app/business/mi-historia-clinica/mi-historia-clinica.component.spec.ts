import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiHistoriaClinicaComponent } from './mi-historia-clinica.component';

describe('MiHistoriaClinicaComponent', () => {
  let component: MiHistoriaClinicaComponent;
  let fixture: ComponentFixture<MiHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiHistoriaClinicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
