import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Calificacion } from '../models/calificacion';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private apiUrl = 'https://ssvs-backend-produccion-production.up.railway.app/api/calificacion';

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

  // Obtener todas las calificaciones
  getCalificaciones(): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Crear una nueva calificación
  crearCalificacion(calificacion: Calificacion): Observable<Calificacion> {
    return this.http.post<Calificacion>(this.apiUrl, calificacion, { headers: this.getAuthHeaders() });
  }

  // Obtener calificaciones por rango de estrellas
  getCalificacionesPorRango(min: number, max: number): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(`${this.apiUrl}/rango?min=${min}&max=${max}`, { headers: this.getAuthHeaders() });
  }

  // Contar calificaciones por número de estrellas
  contarCalificacionesPorEstrella(estrella: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/contador/${estrella}`, { headers: this.getAuthHeaders() });
  }

  // Eliminar una calificación por ID
  eliminarCalificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
