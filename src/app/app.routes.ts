import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Roles } from './components/roles/roles';
import { Users } from './components/users/users';
import { authGuard } from './guards/auth-guard';
import { Login } from './components/login/login';

export const routes: Routes = [
    {
        path: 'home',
        component: Home,
        canActivate: [authGuard]
    },
    {
        path: 'roles',
        component: Roles,
        canActivate: [authGuard]
    },
    {
        path: 'users',
        component: Users,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    }
];
