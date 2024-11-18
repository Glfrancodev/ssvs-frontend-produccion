import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificacion } from '../models/notificacion';
import { AuthService } from './auth.service';
import { AseguradoService } from './asegurado.service';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private apiUrl = 'https://ssvs-backend-produccion-production.up.railway.app/api/notificacion';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private aseguradoService: AseguradoService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`,
    });
  }

  // Obtener todas las notificaciones de un asegurado por ID
  obtenerNotificacionesPorAseguradoId(aseguradoId: number): Observable<Notificacion[]> {
    const url = `${this.apiUrl}/asegurado/${aseguradoId}`;
    return this.http.get<Notificacion[]>(url, { headers: this.getAuthHeaders() });
  }

  // Obtener notificaciones no leídas
  obtenerNotificacionesNoLeidas(aseguradoId: number): Observable<Notificacion[]> {
    const url = `${this.apiUrl}/asegurado/${aseguradoId}/no-leidas`;
    return this.http.get<Notificacion[]>(url, { headers: this.getAuthHeaders() });
  }

  // Marcar todas las notificaciones como leídas
  marcarTodasComoLeidas(aseguradoId: number): Observable<void> {
    const url = `${this.apiUrl}/asegurado/${aseguradoId}/marcar-leidas`;
    return this.http.patch<void>(url, {}, { headers: this.getAuthHeaders() });
  }
}
