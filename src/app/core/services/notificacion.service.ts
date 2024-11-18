import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificacion } from '../models/notificacion';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private apiUrl = 'https://ssvs-backend-produccion-production.up.railway.app/api/notificacion';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`,
    });
  }

  // Obtener todas las notificaciones de un asegurado
  obtenerNotificacionesPorCorreo(correo: string): Observable<Notificacion[]> {
    const url = `${this.apiUrl}/asegurado/${correo}`;
    return this.http.get<Notificacion[]>(url, { headers: this.getAuthHeaders() });
  }

  // Obtener notificaciones no leídas
  obtenerNotificacionesNoLeidas(correo: string): Observable<Notificacion[]> {
    const url = `${this.apiUrl}/asegurado/${correo}/no-leidas`;
    return this.http.get<Notificacion[]>(url, { headers: this.getAuthHeaders() });
  }

  // Marcar todas las notificaciones como leídas
  marcarTodasComoLeidas(): Observable<void> {
    const correo = this.authService.getAuthenticatedUserEmail();
    if (!correo) {
      throw new Error('Correo del usuario no disponible');
    }
    const url = `${this.apiUrl}/asegurado/${correo}/marcar-leidas`;
    return this.http.patch<void>(url, {}, { headers: this.getAuthHeaders() });
  }

  // Crear una nueva notificación
  crearNotificacion(notificacion: Notificacion): Observable<Notificacion> {
    return this.http.post<Notificacion>(this.apiUrl, notificacion, {
      headers: this.getAuthHeaders(),
    });
  }

  // Crear notificaciones masivas
  crearNotificacionesMasivas(notificaciones: Notificacion[]): Observable<void> {
    const url = `${this.apiUrl}/masivas`;
    return this.http.post<void>(url, notificaciones, {
      headers: this.getAuthHeaders(),
    });
  }
}
