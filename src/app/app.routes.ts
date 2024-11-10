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
                canActivate: [AuthGuard]
            },
            {
                path: 'usuario',
                loadComponent: () => import('./business/usuario/usuario.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'medico',
                loadComponent: () => import('./business/medico/medico.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'asegurado',
                loadComponent: () => import('./business/asegurado/asegurado.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'permiso',
                loadComponent: () => import('./business/permiso/permiso.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'rol',
                loadComponent: () => import('./business/rol/rol.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'rol-permiso',
                loadComponent: () => import('./business/rol-permiso/rol-permiso.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'especialidad',
                loadComponent: () => import('./business/especialidad/especialidad.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'asignar-medico',
                loadComponent: () => import('./business/medico-especialidad/medico-especialidad.component'),
                canActivate: [AuthGuard]
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
