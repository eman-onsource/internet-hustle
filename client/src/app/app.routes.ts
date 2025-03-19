import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
   {
      pathMatch: 'full',
      redirectTo: 'auth',
      path: ''
   },
   {
      path: 'auth',
      component: LoginComponent
   }
];
