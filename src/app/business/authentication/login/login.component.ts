import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { BitacoraService } from '../../../core/services/bitacora.service';
import { Bitacora } from '../../../core/models/bitacora';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent {
  correo: string = '';
  contrasena: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private bitacoraService: BitacoraService
  ) {}

  login(): void {
    this.authService.login(this.correo, this.contrasena).subscribe({
      next: () => {
        this.registrarBitacora();
        this.router.navigate(['/dashboard']);
      },
      error: (err) => console.error('Login failed', err)
    });
  }

  registrarBitacora(): void {
    this.bitacoraService.getUserIP().subscribe({
      next: (response) => {
        const now = new Date();
        const fecha = now.toISOString().split('T')[0]; // Obtiene la fecha en formato "YYYY-MM-DD"
        const hora = now.toTimeString().split(' ')[0]; // Obtiene la hora en formato "HH:MM:SS"

        const bitacoraEntry: Bitacora = {
          correo: this.correo,
          fecha: fecha, // String en formato "YYYY-MM-DD"
          hora: hora,   // String en formato "HH:MM:SS"
          ip: response.ip,
          accion: 'Inicio de sesión correcto',
          detalle: 'El usuario inició sesión en la plataforma'
        };

        // Mostrar los datos en consola antes de insertarlos
        console.log('Datos de bitácora antes de la inserción:', bitacoraEntry);

        this.bitacoraService.createBitacora(bitacoraEntry).subscribe({
          next: () => console.log('Bitácora registrada con éxito'),
          error: (err) => console.error('Error al registrar en la bitácora', err)
        });
      },
      error: (err) => console.error('Error al obtener IP', err)
    });
  }
}
