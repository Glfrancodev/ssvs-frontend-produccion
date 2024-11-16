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
  cargando: boolean = false;
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private bitacoraService: BitacoraService
  ) {}

  login(): void {
    this.cargando = true; // Mostrar el indicador de carga
    this.error = ''; // Limpiar errores anteriores

    this.authService.login(this.correo, this.contrasena).subscribe({
      next: () => {
        this.registrarBitacora();
        this.cargando = false; // Ocultar indicador de carga
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.cargando = false; // Ocultar indicador de carga
        this.error = 'Datos ingresados Erróneos'; // Mostrar mensaje de error
      }
    });
  }

  registrarBitacora(): void {
    this.bitacoraService.getUserIP().subscribe({
      next: (response) => {
        const now = new Date();
        const fecha = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const hora = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

        const bitacoraEntry: Bitacora = {
          correo: this.correo,
          fecha: fecha, // String en formato "YYYY-MM-DD"
          hora: hora,   // String en formato "HH:MM:SS"
          ip: response.ip,
          accion: 'Inicio de sesión correcto',
          detalle: 'El usuario inició sesión en la plataforma'
        };

        this.bitacoraService.createBitacora(bitacoraEntry).subscribe({
          next: () => console.log('Bitácora registrada con éxito'),
          error: (err) => console.error('Error al registrar en la bitácora', err)
        });
      },
      error: (err) => console.error('Error al obtener IP', err)
    });
  }
}
