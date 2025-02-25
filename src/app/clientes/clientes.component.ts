import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../cliente';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from '../data.service';



@Component({
  selector: 'app-clientes',
  imports: [CommonModule, MatPaginatorModule,
      MatSortModule,
      MatTableModule,
      MatFormFieldModule,
      MatInputModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit, AfterViewInit{
 


   displayedColumns: string[] = ['nombre', 'tiempoEspera'];
    dataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>([]);
  
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    sort!: MatSort;
  
    constructor(private router: Router,private dataService: DataService) {
      
      this.dataSource = new MatTableDataSource<Cliente>([]);
  
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'tiempoEspera':
            return Number(item.tiempoEspera);
          default:
            return (item as any)[property] ?? ''; 
        }
      };
  
  
  
    }
  
    ngOnInit(): void {
      const clientes = this.dataService.getClientes();
      this.dataSource.data = clientes;
    

    }
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
  
  
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
    onPageChange(event: any) {
      this.dataSource.paginator = this.paginator;
    }
  
    goToAgentes() {
      this.router.navigate(['/agentes']);
    }
    

}