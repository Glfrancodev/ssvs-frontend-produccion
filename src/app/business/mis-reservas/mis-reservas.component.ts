import { Component, OnInit } from '@angular/core';
import { CupoService } from '../../core/services/cupo.service';
import { AuthService } from '../../core/services/auth.service';
import { AseguradoService } from '../../core/services/asegurado.service';
import { Cupo } from '../../core/models/cupo';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

interface CupoConEstado extends Cupo {
  isDeleting: boolean;
}

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css'],
  imports: [TableModule, CommonModule, ButtonModule]
})
export default class MisReservasComponent implements OnInit {
  cupos: CupoConEstado[] = [];

  constructor(
    private cupoService: CupoService,
    private authService: AuthService,
    private aseguradoService: AseguradoService
  ) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    const correoAsegurado = this.authService.getAuthenticatedUserEmail();
    if (correoAsegurado) {
      this.aseguradoService.getAseguradoPorCorreo(correoAsegurado).subscribe(
        (asegurado) => {
          if (asegurado.id !== undefined) {
            this.cupoService.obtenerCuposPorAsegurado(asegurado.id).subscribe(
              (cupos) => {
                this.cupos = cupos.map(cupo => ({ ...cupo, isDeleting: false }));
                console.log("Cupos obtenidos:", this.cupos);
              },
              (error) => console.error('Error al obtener cupos:', error)
            );
          } else {
            console.error('El ID del asegurado es undefined.');
          }
        },
        (error) => console.error('Error al obtener el asegurado:', error)
      );
    } else {
      console.error('No se pudo obtener el correo del asegurado.');
    }
  }

  confirmDelete(cupo: CupoConEstado): void {
    cupo.isDeleting = true; // Muestra los iconos de confirmación
  }

  cancelDelete(cupo: CupoConEstado): void {
    cupo.isDeleting = false; // Oculta los iconos de confirmación
  }

  liberarCupo(cupo: CupoConEstado): void {
    const cupoActualizado: Partial<Cupo> = {
      estado: 'Libre'
    };

    this.cupoService.reservarCupo(cupo.id!, cupoActualizado).subscribe(
      (response) => {
        console.log("Cupo liberado exitosamente:", response);
        cupo.estado = 'Libre';
        cupo.isDeleting = false;
        this.cargarReservas();
      },
      (error) => {
        console.error("Error al liberar el cupo:", error);
        cupo.isDeleting = false;
      }
    );
  }
}
