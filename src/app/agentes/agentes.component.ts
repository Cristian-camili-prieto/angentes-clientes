import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Agente } from '../agente';
import { DataService } from '../data.service';
import { WebSocketService } from '../services/web-socket.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agentes',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './agentes.component.html',
  styleUrls: ['./agentes.component.css']
})
export class AgentesComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['nombre', 'estado', 'tiempoEspera'];
  dataSource: MatTableDataSource<Agente> = new MatTableDataSource<Agente>([]);
  private webSocketSubscription!: Subscription;
  private timerSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private dataService: DataService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    const agentes = this.dataService.getAgentes() ?? [];
    this.dataSource = new MatTableDataSource(agentes);

    this.dataSource.filterPredicate = (data: Agente, filter: string): boolean => {
      const filterValue = filter.trim().toLowerCase();
      return (
        data.nombre.toLowerCase().includes(filterValue) ||
        data.estado.toLowerCase().includes(filterValue)
      );
    };

    this.webSocketSubscription = this.webSocketService.getUpdates().subscribe((agenteActualizado) => {
      console.log('Actualización recibida:', agenteActualizado);
      if (agenteActualizado) {
        this.dataService.updateAgenteEstado(agenteActualizado.id, agenteActualizado.estado);
        const index = this.dataSource.data.findIndex(
          (agente) => agente.id === agenteActualizado.id
        );
        if (index !== -1) {
          this.dataSource.data[index] = agenteActualizado;
          this.dataSource.data = [...this.dataSource.data];
        }
      }
    });


  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    if (this.webSocketSubscription) {
      this.webSocketSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('Filtro aplicado:', filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageChange(event: any): void {
    console.log('Página cambiada:', event);
  }

  goToClientes(): void {
    this.router.navigate(['/clientes']);
  }

  cambiarEstado(agente: Agente, nuevoEstado: boolean): void {
    const nuevoEstadoTexto = nuevoEstado ? 'Disponible' : 'En llamada';
    this.dataService.updateAgenteEstado(agente.id, nuevoEstadoTexto);
    agente.estado = nuevoEstadoTexto;
    if (nuevoEstadoTexto === 'Disponible') {
      agente.tiempoEspera = 0; 
    }
    this.webSocketService.actualizarEstadoAgente(agente);
    this.dataSource.data = [...this.dataSource.data]; 
  }

  isChecked(agente: Agente): boolean {
    return agente.estado === 'Disponible';
  }


}
