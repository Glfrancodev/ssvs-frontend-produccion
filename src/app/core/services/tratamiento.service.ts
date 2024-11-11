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
  private apiUrl = 'http://localhost:8080/api/tratamiento';

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

}