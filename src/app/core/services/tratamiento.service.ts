// src/app/core/services/consulta.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta';
import { AuthService } from './auth.service';
import { Tratamiento } from '../models/tratamiento';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  private apiUrl = 'https://ssvs-backend-produccion-production.up.railway.app/api/tratamiento';

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

  // Método para obtener el tratamiento por consulta ID
  getTratamientoByConsultaId(consultaId: number): Observable<Tratamiento> {
    return this.http.get<Tratamiento>(`${this.apiUrl}/consulta/${consultaId}`, { headers: this.getAuthHeaders() });
  }

  createTratamiento(tratamiento: Tratamiento): Observable<Tratamiento> {
    return this.http.post<Tratamiento>(this.apiUrl, tratamiento, { headers: this.getAuthHeaders() });
  }

}