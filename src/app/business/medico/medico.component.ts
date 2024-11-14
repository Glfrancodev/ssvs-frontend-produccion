import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Usuario } from '../../core/models/usuario';
import { UsuarioService } from '../../core/services/usuario.service';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { Medico } from '../../core/models/medico';
import { MedicoService } from '../../core/services/medico.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { BitacoraService } from '../../core/services/bitacora.service'; // Importa el servicio de bitácora
import { Bitacora } from '../../core/models/bitacora';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [ToastModule, DropdownModule, TableModule, FormsModule, ButtonModule, RippleModule, InputGroupAddonModule, InputGroupModule],
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css'],
  providers: [MessageService]
})
export default class MedicoComponent {
  medicos: Medico[] = [];
  usuariosDisponibles: Usuario[] = [];
  nuevoMedico: Medico = { item: '', usuario: { id: 0, ci: '', correo: '', contrasena: '', nombre: '', apellido: '', estaActivo: true, rol: undefined } };

  constructor(
    private medicoService: MedicoService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private authService: AuthService,
    private bitacoraService: BitacoraService // Inyecta el servicio de bitácora
  ) {}

  ngOnInit(): void {
    this.getMedicos();
    this.getUsuariosDisponibles();
  }

  getMedicos() {
    this.medicoService.getMedicos().subscribe(
      (data) => (this.medicos = data),
      (error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los médicos' })
    );
  }

  getUsuariosDisponibles() {
    this.usuarioService.getUsuariosSinMedicoByRol(3).subscribe(
      (data) => (this.usuariosDisponibles = data),
      (error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los usuarios disponibles' })
    );
  }

  addMedico() {
    const correoMedico = this.nuevoMedico.usuario?.correo; // Guarda el correo antes de reiniciar
  
    this.medicoService.createMedico(this.nuevoMedico).subscribe(
      (data) => {
        this.getMedicos();
        this.medicos.push(data);
        this.messageService.add({ severity: 'success', summary: 'Añadido', detail: 'Médico añadido correctamente' });
        
        // Registro en bitácora usando el correo guardado
        this.registrarBitacora('Añadir médico', `Médico creado: ${correoMedico}`);
        
        this.resetNuevoMedico();
        this.getUsuariosDisponibles();
      },
      (error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo añadir el médico' })
    );
  }
  
  

  deleteMedico(id: number) {
    const medicoEliminado = this.medicos.find((medico) => medico.id === id);
    this.medicoService.deleteMedico(id).subscribe(
      () => {
        this.medicos = this.medicos.filter((medico) => medico.id !== id);
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Médico eliminado correctamente' });
        
        // Registro en bitácora
        if (medicoEliminado) {
          const correoMedico = medicoEliminado.usuario?.correo;
          this.registrarBitacora('Eliminar médico', `Médico eliminado: ${correoMedico}`);
        }
        
        this.getUsuariosDisponibles();
      },
      (error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el médico' })
    );
  }

  resetNuevoMedico() {
    this.nuevoMedico = { item: '', usuario: { id: undefined, ci: '', correo: '', contrasena: '', nombre: '', apellido: '', estaActivo: true, rol: undefined } };
  }

  // Método para registrar en la bitácora
  registrarBitacora(accion: string, detalle: string): void {
    this.bitacoraService.getUserIP().subscribe({
      next: (response) => {
        const now = new Date();
        const fecha = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const hora = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

        const bitacoraEntry: Bitacora = {
          correo: this.authService.getAuthenticatedUserEmail() || '',
          fecha: fecha,
          hora: hora,
          ip: response.ip,
          accion: accion,
          detalle: detalle
        };

        this.bitacoraService.createBitacora(bitacoraEntry).subscribe({
          next: () => console.log('Registro de bitácora exitoso'),
          error: (err) => console.error('Error al registrar en bitácora', err)
        });
      },
      error: (err) => console.error('Error al obtener IP', err)
    });
  }
}
