import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecetaService } from '../../core/services/receta.service';
import { TratamientoService } from '../../core/services/tratamiento.service';
import { Receta } from '../../core/models/receta';
import { Tratamiento } from '../../core/models/tratamiento';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-tratamiento',
  standalone: true,
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css'],
  imports: [TableModule]
})
export default class TratamientoComponent implements OnInit {
  recetas: Receta[] = [];
  tratamientoId?: number;

  constructor(
    private recetaService: RecetaService,
    private tratamientoService: TratamientoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const consultaId = Number(this.route.snapshot.paramMap.get('consultaId')); // obtienes el consultaId de la URL
    if (consultaId) {
      this.obtenerTratamientoYRecetas(consultaId);
    }
  }

  private obtenerTratamientoYRecetas(consultaId: number): void {
    // Llamada para obtener el tratamiento asociado a la consulta
    this.tratamientoService.getTratamientoByConsultaId(consultaId).subscribe(
      tratamiento => {
        if (tratamiento.id) {
          this.tratamientoId = tratamiento.id; // Guarda el tratamientoId
          this.cargarRecetas(tratamiento.id);  // Carga las recetas con el tratamientoId obtenido
        }
      },
      error => {
        console.error('Error al obtener el tratamiento:', error);
      }
    );
  }

  private cargarRecetas(tratamientoId: number): void {
    // Llamada para obtener las recetas del tratamiento
    this.recetaService.getRecetasByTratamientoId(tratamientoId).subscribe(
      recetas => {
        this.recetas = recetas;
      },
      error => {
        console.error('Error al cargar recetas:', error);
      }
    );
  }
}
