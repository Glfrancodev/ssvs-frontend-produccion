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


@Component({
  selector: 'app-medico',
  standalone: true,
  imports:[ToastModule,DropdownModule,TableModule,FormsModule,ButtonModule,RippleModule,InputGroupAddonModule,InputGroupModule],
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css'],
  providers: [MessageService]
})
export default class MedicoComponent {
  medicos: Medico[] = [];
  usuariosDisponibles: Usuario[] = [];
  nuevoMedico: Medico = { item: '', usuario: { id: 0, ci: '', correo: '', contrasena: '', nombre: '', apellido: '', estaActivo: true, rol: undefined } }; // Asegura que usuario esté inicializado

  constructor(
    private medicoService: MedicoService,
    private usuarioService: UsuarioService,
    private messageService: MessageService
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
    this.medicoService.createMedico(this.nuevoMedico).subscribe(
      (data) => {
        this.getMedicos();
        this.medicos.push(data);
        this.messageService.add({ severity: 'success', summary: 'Añadido', detail: 'Médico añadido correctamente' });
        this.resetNuevoMedico();
        this.getUsuariosDisponibles();
      },
      (error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo añadir el médico' })
    );
  }

  resetNuevoMedico() {
    this.nuevoMedico = { item: '', usuario: { id: undefined, ci: '', correo: '', contrasena: '', nombre: '', apellido: '', estaActivo: true, rol: undefined } };
  }

  deleteMedico(id: number) {
    this.medicoService.deleteMedico(id).subscribe(
      () => {
        this.medicos = this.medicos.filter((medico) => medico.id !== id);
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Médico eliminado correctamente' });
        this.getUsuariosDisponibles();
      },
      (error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el médico' })
    );
  }
  
}
