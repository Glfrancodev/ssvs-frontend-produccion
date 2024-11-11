// src/app/business/consulta/consulta.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CupoService } from '../../core/services/cupo.service';
import { Cupo } from '../../core/models/cupo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  standalone: true,
  imports:[CommonModule, FormsModule]
})
export default class ConsultaComponent implements OnInit {
  cupo?: Cupo;
  consulta = {
    motivo: '',
    diagnostico: '',
    nota: ''
  };

  constructor(
    private route: ActivatedRoute,
    private cupoService: CupoService
  ) {}

  ngOnInit(): void {
    const cupoId = Number(this.route.snapshot.paramMap.get('cupoId'));
    if (cupoId) {
      this.obtenerCupo(cupoId);
    }
  }

  private obtenerCupo(cupoId: number): void {
    this.cupoService.getCupoById(cupoId).subscribe(
      cupo => {
        this.cupo = cupo;
        console.log('Cupo recuperado:', cupo);
      },
      error => {
        console.error('Error al obtener el cupo:', error);
      }
    );
  }

  onSubmit(): void {
    console.log('Datos de la consulta:', this.consulta);
    // Aquí puedes manejar la lógica para enviar la consulta al backend
  }

  recetas: { medicamento: string; frecuencia: string; fechaInicio: string; fechaFinal: string }[] = [];

  agregarReceta(): void {
    this.recetas.push({
      medicamento: '',
      frecuencia: '',
      fechaInicio: '',
      fechaFinal: ''
    });
  }

}
