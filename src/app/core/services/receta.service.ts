// src/app/core/services/receta.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receta } from '../models/receta';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private apiUrl = 'https://ssvs-backend-produccion-production.up.railway.app/api/receta';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  createReceta(receta: Receta): Observable<Receta> {
    return this.http.post<Receta>(this.apiUrl, receta, { headers: this.getAuthHeaders() });
  }

  // Método para obtener las recetas por tratamiento ID
  getRecetasByTratamientoId(tratamientoId: number): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/tratamiento/${tratamientoId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
