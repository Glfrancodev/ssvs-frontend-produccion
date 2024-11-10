import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Rol } from '../../core/models/rol';
import { RolService } from '../../core/services/rol.service';
import { Usuario } from '../../core/models/usuario';
import { UsuarioService } from '../../core/services/usuario.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-usuario',
  standalone: true,
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  imports: [ToastModule, TableModule, CommonModule, FormsModule, ButtonModule, RippleModule, InputGroupAddonModule, InputGroupModule, DropdownModule],
  providers: [MessageService],
})
export default class UsuarioComponent {
  usuarios: Usuario[] = [];
  roles: Rol[] = [];
  editedUsuarios: { [key: number]: Usuario } = {};
  estadoOptions = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false }
  ];

  // Modelo para el nuevo usuario con rol inicializado
  newUsuario: Usuario = {
    ci: '',
    correo: '',
    contrasena: '',
    nombre: '',
    apellido: '',
    estaActivo: true,
    rol: { id: 0, nombre: '' } // Asegúrate de que `nombre` esté definido
  };

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllUsuarios();
    this.getAllRoles();
  }

  getAllUsuarios() {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
      this.sortUsuarios();
    });
  }

  getAllRoles() {
    this.rolService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  // Ordena los usuarios
  sortUsuarios() {
    this.usuarios.sort((a, b) => (a.id || 0) - (b.id || 0));
  }

  onRowEditInit(usuario: Usuario) {
    this.editedUsuarios[usuario.id!] = { ...usuario };
    this.messageService.add({ severity: 'info', summary: 'Edición', detail: 'Editando usuario' });
  }

  onRowEditSave(usuario: Usuario) {
    this.usuarioService.updateUsuario(usuario).subscribe(() => {
      delete this.editedUsuarios[usuario.id!];
      this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Usuario actualizado' });
      this.getAllUsuarios();
    });
  }

  onRowEditCancel(usuario: Usuario, rowIndex: number) {
    this.usuarios[rowIndex] = this.editedUsuarios[usuario.id!] || usuario;
    delete this.editedUsuarios[usuario.id!];
    this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Edición cancelada' });
  }

  toggleEstadoUsuario(usuario: Usuario) {
    const updatedUsuario = { ...usuario, estaActivo: !usuario.estaActivo };
    this.usuarioService.updateUsuario(updatedUsuario).subscribe(() => {
      usuario.estaActivo = !usuario.estaActivo;
      this.sortUsuarios();
      this.messageService.add({
        severity: 'success',
        summary: usuario.estaActivo ? 'Activado' : 'Desactivado',
        detail: `Usuario ${usuario.estaActivo ? 'activado' : 'desactivado'} correctamente`,
      });
    });
  }

  addUsuario() {
    this.usuarioService.createUsuario(this.newUsuario).subscribe((usuario) => {
      this.getAllUsuarios(); // Recargar la lista completa de usuarios después de agregar el nuevo usuario
      this.messageService.add({
        severity: 'success',
        summary: 'Usuario Agregado',
        detail: 'Nuevo usuario creado correctamente',
      });
      // Reiniciar el formulario después de agregar
      this.newUsuario = {
        ci: '',
        correo: '',
        contrasena: '',
        nombre: '',
        apellido: '',
        estaActivo: false,
        rol: { id: 0, nombre: '' }
      };
    });
  }
  
}
