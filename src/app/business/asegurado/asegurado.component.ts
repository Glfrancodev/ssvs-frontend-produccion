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
  };

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
        this.getAsegurados();
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
}
