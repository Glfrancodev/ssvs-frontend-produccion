import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../core/services/consulta.service';
import { AuthService } from '../../core/services/auth.service';
import { AseguradoService } from '../../core/services/asegurado.service';
import { Consulta } from '../../core/models/consulta';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-historia-clinica',
  standalone: true,
  templateUrl: './mi-historia-clinica.component.html',
  styleUrls: ['./mi-historia-clinica.component.css'],
  imports: [TableModule, CommonModule, ButtonModule]
})
export default class HistoriaClinicaComponent implements OnInit {
  consultas: Consulta[] = [];

  constructor(
    private consultaService: ConsultaService,
    private authService: AuthService,
    private aseguradoService: AseguradoService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.cargarHistoriaClinica();
  }

  cargarHistoriaClinica(): void {
    const correoAsegurado = this.authService.getAuthenticatedUserEmail();
    if (correoAsegurado) {
      // Obtener el asegurado por correo
      this.aseguradoService.getAseguradoPorCorreo(correoAsegurado).subscribe(
        (asegurado) => {
          if (asegurado.historiaClinica?.id !== undefined) {
            this.obtenerConsultasPorHistoriaClinica(asegurado.historiaClinica.id);
          } else {
            console.error("El asegurado no tiene una historia clínica asignada.");
          }
        },
        (error) => console.error("Error al obtener el asegurado:", error)
      );
    } else {
      console.error("No se pudo obtener el correo del asegurado.");
    }
  }

  obtenerConsultasPorHistoriaClinica(historiaClinicaId: number): void {
    this.consultaService.getConsultasPorHistoriaClinicaId(historiaClinicaId).subscribe(
      (consultas) => {
        this.consultas = consultas;
        console.log("Consultas obtenidas:", this.consultas);
      },
      (error) => console.error("Error al obtener las consultas:", error)
    );
  }

  // Navega al componente Tratamiento con el consultaId
  irATratamiento(consultaId: number): void {
    this.router.navigate(['/tratamiento', consultaId]);
  }


}
