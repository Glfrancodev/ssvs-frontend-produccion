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
    private messageService: MessageService
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

  getUsuariosDisponibles() {
    this.usuarioService.getUsuariosSinAseguradoByRol(2).subscribe(
      (data) => (this.usuariosDisponibles = data),
      (error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los usuarios disponibles' })
    );
  }

  addAsegurado() {
    this.aseguradoService.createAsegurado(this.nuevoAsegurado).subscribe(
      (data) => {
        this.getAsegurados()
        this.asegurados.push(data);
        this.messageService.add({ severity: 'success', summary: 'Añadido', detail: 'Asegurado añadido correctamente' });
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
    this.aseguradoService.deleteAsegurado(id).subscribe(
      () => {
        this.asegurados = this.asegurados.filter((asegurado) => asegurado.id !== id);
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Asegurado eliminado correctamente' });
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
    });
  }

  onRowEditCancel(asegurado: Asegurado, rowIndex: number) {
    this.asegurados[rowIndex] = this.editedAsegurados[asegurado.id!] || asegurado;
    delete this.editedAsegurados[asegurado.id!];
    this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Edición cancelada' });
  }
}
