import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bitacora } from '../models/bitacora';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {
  private apiUrl = 'https://ssvs-backend-produccion-production.up.railway.app/api/bitacora';

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

  // Obtener todos los registros de bitácora
  getBitacoras(): Observable<Bitacora[]> {
    return this.http.get<Bitacora[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Filtrar registros de bitácora por rango de fechas
  getBitacorasByDateRange(startDate: Date, endDate: Date): Observable<Bitacora[]> {
    const startDateStr = startDate.toISOString().split('T')[0]; // formato "yyyy-MM-dd"
    const endDateStr = endDate.toISOString().split('T')[0];

    const url = `${this.apiUrl}/fecha/rango?inicio=${startDateStr}&fin=${endDateStr}`;
    return this.http.get<Bitacora[]>(url, { headers: this.getAuthHeaders() });
  }

  // Crear un nuevo registro de bitácora
  createBitacora(bitacora: Bitacora): Observable<Bitacora> {
    return this.http.post<Bitacora>(this.apiUrl, bitacora, { headers: this.getAuthHeaders() });
  }
    // Método para obtener la IP del usuario
  getUserIP(): Observable<any> {
    return this.http.get('https://api.ipify.org?format=json');
  }
}
