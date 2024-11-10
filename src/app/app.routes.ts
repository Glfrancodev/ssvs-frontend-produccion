import { Routes } from '@angular/router';
import { AuthGuard} from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.component'),
                canActivate: [AuthGuard],
                data: { roles: ['Medico', 'Asegurado', 'SuperUsuario'] }
            },
            {
                path: 'usuario',
                loadComponent: () => import('./business/usuario/usuario.component'),
                canActivate: [AuthGuard],
                data: { roles: ['SuperUsuario'] }
            },
            {
                path: 'medico',
                loadComponent: () => import('./business/medico/medico.component'),
                canActivate: [AuthGuard],
                data: { roles: ['SuperUsuario'] }
            },
            {
                path: 'asegurado',
                loadComponent: () => import('./business/asegurado/asegurado.component'),
                canActivate: [AuthGuard],
                data: { roles: ['SuperUsuario'] }
            },
            {
                path: 'permiso',
                loadComponent: () => import('./business/permiso/permiso.component'),
                canActivate: [AuthGuard],
                data: { roles: ['SuperUsuario'] }
            },
            {
                path: 'rol',
                loadComponent: () => import('./business/rol/rol.component'),
                canActivate: [AuthGuard],
                data: { roles: ['SuperUsuario'] }
            },
            {
                path: 'rol-permiso',
                loadComponent: () => import('./business/rol-permiso/rol-permiso.component'),
                canActivate: [AuthGuard],
                data: { roles: ['SuperUsuario'] }
            },
            {
                path: 'especialidad',
                loadComponent: () => import('./business/especialidad/especialidad.component'),
                canActivate: [AuthGuard],
                data: { roles: ['SuperUsuario'] }
            },
            {
                path: 'asignar-medico',
                loadComponent: () => import('./business/medico-especialidad/medico-especialidad.component'),
                canActivate: [AuthGuard],
                data: { roles: ['SuperUsuario'] }
            },
            {
                path: 'permiso-ausencia',
                loadComponent: () => import('./business/permiso-ausencia/permiso-ausencia.component'),
                canActivate: [AuthGuard],
                data: { roles: ['SuperUsuario'] }
            },
            {
                path: 'horario',
                loadComponent: () => import('./business/horario/horario.component'),
                canActivate: [AuthGuard],
                data: { roles: ['SuperUsuario'] }
            },
            {
                path: 'cupo',
                loadComponent: () => import('./business/cupo/cupo.component'),
                canActivate: [AuthGuard],
                data: { roles: ['SuperUsuario'] }
            },
            {
                path:'',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./business/authentication/login/login.component'),
        canActivate: [AuthenticatedGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }

];
