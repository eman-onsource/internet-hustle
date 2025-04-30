import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { InvoicesComponent } from './components/invoices/invoices.component';

export const routes: Routes = [
   {
      pathMatch: 'full',
      redirectTo: 'auth',
      path: ''
   },
   {
      path: 'auth',
      component: LoginComponent
   },
   {
      path: 'dashboard',
      component: HomeComponent
   },
   {
      path: 'invoices',
      component: InvoicesComponent
   }
];
