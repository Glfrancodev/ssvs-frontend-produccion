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
  private apiUrl = 'http://localhost:8080/api/receta';

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

  // Método para obtener las recetas por tratamiento ID
  getRecetasByTratamientoId(tratamientoId: number): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/tratamiento/${tratamientoId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
