import { Routes } from '@angular/router';
import { AgentesComponent } from './agentes/agentes.component';
import { ClientesComponent } from './clientes/clientes.component';

export const routes: Routes = [
  { path: '', redirectTo: '/agentes', pathMatch: 'full' },  // Ruta por defecto
  { path: 'agentes', component: AgentesComponent },  // Ruta principal
  { path: 'clientes', component: ClientesComponent }
];
