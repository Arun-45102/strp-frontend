import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Roles } from './components/roles/roles';
import { Users } from './components/users/users';
import { authGuard } from './guards/auth-guard';
import { Login } from './components/login/login';
import { Channels } from './components/channels/channels';
import { Profile } from './components/profile/profile';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard],
  },
  {
    path: 'roles',
    component: Roles,
    canActivate: [authGuard],
  },
  {
    path: 'channels',
    component: Channels,
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: Users,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];
