import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgentesComponent } from "./agentes/agentes.component";
import { ClientesComponent } from "./clientes/clientes.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AgentesComponent, ClientesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angentes-clientes';
}
