import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Asegurado } from '../../core/models/asegurado';
import { Usuario } from '../../core/models/usuario';
import { AseguradoService } from '../../core/services/asegurado.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { BitacoraService } from '../../core/services/bitacora.service'; // Importa el servicio de bitácora
import { Bitacora } from '../../core/models/bitacora';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-asegurado',
  standalone: true,
  templateUrl: './asegurado.component.html',
  styleUrls: ['./asegurado.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ToastModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    RippleModule,
  ],
  providers: [MessageService],
})
export default class AseguradoComponent {
  asegurados: Asegurado[] = [];
  usuariosDisponibles: Usuario[] = [];
  nuevoAsegurado: Asegurado = {
    tipoSangre: '',
    sexo: '',
    fechaNacimiento: '',
    usuario: { id: 0, ci: '', correo: '', contrasena: '', nombre: '', apellido: '', estaActivo: true, rol: undefined },
    historiaClinica: {id:0}
  };
  editedAsegurados: { [key: number]: Asegurado } = {};

  // Configuración de orden de la tabla
  sortField: string = 'id';
  sortOrder: number = 1;

  constructor(
    private aseguradoService: AseguradoService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private bitacoraService: BitacoraService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAsegurados();
    this.getUsuariosDisponibles();
  }

  getAsegurados() {
    this.aseguradoService.getAsegurados().subscribe(
      (data) => (this.asegurados = data),
      (error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los asegurados' })
    );
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


  getUsuariosDisponibles() {
    this.usuarioService.getUsuariosSinAseguradoByRol(2).subscribe(
      (data) => (this.usuariosDisponibles = data),
      (error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los usuarios disponibles' })
    );
  }

  addAsegurado() {
    this.aseguradoService.createAsegurado(this.nuevoAsegurado).subscribe(
      (data) => {
        this.getAsegurados();
        this.asegurados.push(data);
        this.messageService.add({ severity: 'success', summary: 'Añadido', detail: 'Asegurado añadido correctamente' });
        
        // Verifica si el correo está en `data.usuario`, de lo contrario, usa el correo de `this.nuevoAsegurado`.
        const correoAsegurado = this.nuevoAsegurado.usuario!.correo;
        
        // Registro en bitácora
        this.registrarBitacora('Añadir asegurado', `Asegurado creado: ${correoAsegurado}`);
        
        this.resetNuevoAsegurado();
        this.getUsuariosDisponibles();
      },
      (error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo añadir el asegurado' })
    );
  }
  

  resetNuevoAsegurado() {
    this.nuevoAsegurado = {
      tipoSangre: '',
      sexo: '',
      fechaNacimiento: '',
      usuario: { id: 0, ci: '', correo: '', contrasena: '', nombre: '', apellido: '', estaActivo: true, rol: undefined },
      historiaClinica: {id:0}
    };
  }

  deleteAsegurado(id: number) {
    // Guardamos el asegurado antes de eliminarlo
    const aseguradoEliminado = this.asegurados.find((asegurado) => asegurado.id === id);
    if (!aseguradoEliminado) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Asegurado no encontrado' });
      return;
    }
    this.aseguradoService.deleteAsegurado(id).subscribe(
      () => {
        this.asegurados = this.asegurados.filter((asegurado) => asegurado.id !== id);
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Asegurado eliminado correctamente' });
        // Registro en bitácora
        this.registrarBitacora('Eliminar asegurado', `Asegurado eliminado: ${aseguradoEliminado?.usuario?.correo}`);
        this.getUsuariosDisponibles();
      },
      (error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el asegurado' })
    );
  }

  onRowEditInit(asegurado: Asegurado) {
    this.editedAsegurados[asegurado.id!] = { ...asegurado };
    this.messageService.add({ severity: 'info', summary: 'Edición', detail: 'Editando tipo de sangre' });
  }

  onRowEditSave(asegurado: Asegurado) {
    this.aseguradoService.updateAsegurado(asegurado).subscribe(() => {
      delete this.editedAsegurados[asegurado.id!];
      this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Tipo de sangre actualizado' });
      // Registro en bitácora
      this.registrarBitacora('Modificar asegurado', `Asegurado modificado: ${asegurado.usuario?.correo}`);
    });
  }

  onRowEditCancel(asegurado: Asegurado, rowIndex: number) {
    this.asegurados[rowIndex] = this.editedAsegurados[asegurado.id!] || asegurado;
    delete this.editedAsegurados[asegurado.id!];
    this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Edición cancelada' });
  }
}
