import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cupo } from '../models/cupo';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CupoService {
  private apiUrl = 'https://ssvs-backend-produccion-production.up.railway.app/api/cupo';

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

  getCuposPorHorario(horarioId: number): Observable<Cupo[]> {
    return this.http.get<Cupo[]>(`${this.apiUrl}/horario/${horarioId}`, { headers: this.getAuthHeaders() });
  }

  // Método para obtener cupos ocupados por horarioId
  getCuposOcupadosPorHorario(horarioId: number): Observable<Cupo[]> {
    return this.http.get<Cupo[]>(`${this.apiUrl}/horario/${horarioId}/ocupado`, { headers: this.getAuthHeaders() });
  }

  getCupoById(id: number): Observable<Cupo> {
    return this.http.get<Cupo>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Método para actualizar el estado de un cupo
  actualizarEstadoCupo(id: number, estado: string): Observable<Cupo> {
    return this.http.put<Cupo>(`${this.apiUrl}/estado/${id}`, estado, { headers: this.getAuthHeaders() });
  }

  // Método para reservar un cupo
  reservarCupo(id: number, cupo: Partial<Cupo>): Observable<Cupo> {
    return this.http.put<Cupo>(`${this.apiUrl}/reservar/${id}`, cupo, { headers: this.getAuthHeaders() });
  }

  obtenerCuposPorAsegurado(aseguradoId: number): Observable<Cupo[]> {
    return this.http.get<Cupo[]>(`${this.apiUrl}/asegurado/${aseguradoId}`, { headers: this.getAuthHeaders() });
  }

}
