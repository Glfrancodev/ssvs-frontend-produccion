import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Asegurado } from '../models/asegurado';

@Injectable({
  providedIn: 'root'
})
export class AseguradoService {
  private apiUrl = 'http://localhost:8080/api/asegurado';

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

  getAsegurados(): Observable<Asegurado[]> {
    return this.http.get<Asegurado[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getAseguradoById(id: number): Observable<Asegurado> {
    return this.http.get<Asegurado>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createAsegurado(asegurado: Asegurado): Observable<Asegurado> {
    return this.http.post<Asegurado>(this.apiUrl, asegurado, { headers: this.getAuthHeaders() });
  }

  updateAsegurado(asegurado: Asegurado): Observable<Asegurado> {
    return this.http.put<Asegurado>(`${this.apiUrl}/${asegurado.id}`, asegurado, { headers: this.getAuthHeaders() });
  }

  deleteAsegurado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
