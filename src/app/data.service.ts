import { Injectable } from '@angular/core';
import { Agente } from './agente';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private agentes: Agente[] = [
    { id: 1, nombre: 'Cristian Prieto', estado: 'Disponible', tiempoEspera: 0 },
    { id: 2, nombre: 'Carlos Ramírez', estado: 'Disponible', tiempoEspera: 0 },
    { id: 3, nombre: 'María González', estado: 'En llamada', tiempoEspera: 5 },
    { id: 4, nombre: 'Luis Fernández', estado: 'Disponible', tiempoEspera: 0 },
    { id: 5, nombre: 'Ana Martínez', estado: 'Disponible', tiempoEspera: 0 },
    { id: 6, nombre: 'Javier López', estado: 'En llamada', tiempoEspera: 5 },
    { id: 7, nombre: 'Patricia Sánchez', estado: 'Disponible', tiempoEspera: 0 },
    { id: 8, nombre: 'Andrés Castro', estado: 'Disponible', tiempoEspera: 0 },
    { id: 9, nombre: 'Verónica Morales', estado: 'En llamada', tiempoEspera: 10 },
    { id: 10, nombre: 'Sofía Herrera', estado: 'Disponible', tiempoEspera: 0 },
    { id: 11, nombre: 'Ricardo Vargas', estado: 'Disponible', tiempoEspera: 0 },
    { id: 12, nombre: 'Isabel Ríos', estado: 'En llamada', tiempoEspera: 14 },
    { id: 13, nombre: 'Fernando Navarro', estado: 'Disponible', tiempoEspera: 0 }
  ];

  private clientes: Cliente[] = [
    { nombre: 'Gabriel Torres', tiempoEspera: 10 },
    { nombre: 'Laura Mendoza', tiempoEspera: 15 },
    { nombre: 'Diego Salazar', tiempoEspera: 5 },
    { nombre: 'Camila Vargas', tiempoEspera: 12 },
    { nombre: 'Mateo Ríos', tiempoEspera: 8 },
    { nombre: 'Valentina Castro', tiempoEspera: 20 },
    { nombre: 'Emiliano Herrera', tiempoEspera: 7 },
    { nombre: 'Lucía Morales', tiempoEspera: 3 },
    { nombre: 'Sebastián Navarro', tiempoEspera: 18 },
    { nombre: 'Daniela Ramírez', tiempoEspera: 9 },
    { nombre: 'Martín López', tiempoEspera: 4 },
    { nombre: 'Mariana Sánchez', tiempoEspera: 11 },
    { nombre: 'Tomás Fernández', tiempoEspera: 6 },
    { nombre: 'Elena González', tiempoEspera: 14 },
    { nombre: 'Samuel Castro', tiempoEspera: 2 }
  ];

  constructor() {}

  // ✅ Obtener todos los agentes
  getAgentes(): Agente[] {
    return this.agentes;
  }

  // ✅ Obtener todos los clientes
  getClientes(): Cliente[] {
    return this.clientes;
  }

  // 🔄 Actualizar el estado de un agente en tiempo real
  updateAgenteEstado(id: number, nuevoEstado: string): void {
    const agente = this.agentes.find((a) => a.id === id);
    if (agente) {
      agente.estado = nuevoEstado;
    }
  }
}
