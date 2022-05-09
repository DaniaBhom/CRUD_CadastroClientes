import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { CadastroClientes } from './../../models/CadastroClientes';

const ELEMENT_DATA: CadastroClientes[] = [
  {codigo: 1, nome: 'José Almeida', email: 'josealmeida@gmail.com', wathsapp: '(47) 9971-2211'},
  {codigo: 2, nome: 'Marcos da Costa', email: 'marcoscosta@gmail.com', wathsapp: '(47) 9971-2211'},
  {codigo: 3, nome: 'Aline Tavares', email: 'alinetavares@gmail.com', wathsapp: '(47) 9971-2211'},
  {codigo: 4, nome: 'Karina Silva', email: 'karinasilva@gmail.com', wathsapp: '(47) 9971-2211'},
  {codigo: 5, nome: 'Jéssica Carvalho', email: 'jessicacarvalho@gmail.com', wathsapp: '(47) 9971-2211'},
  {codigo: 6, nome: 'Daniel Carlos', email: 'danielcarlos@gmail.com', wathsapp: '(47) 9971-2211'},
  {codigo: 7, nome: 'Henrique Faria', email: 'henriquefaria@gmail.com', wathsapp: '(47) 9971-2211'},
  {codigo: 8, nome: 'João Medeiros', email: 'joaomedeiros@gmail.com', wathsapp: '(47) 9971-2211'},
  {codigo: 9, nome: 'Caique Furtado', email: 'caiquefurtado@gmail.com', wathsapp: '(47) 9971-2211'},
  {codigo: 10, nome: 'Gilson Almeida', email: 'gilsonalmeida@gmail.com', wathsapp: '(47) 9971-2211'},
];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  })

export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['codigo', 'nome', 'email', 'wathsapp', 'actions'];
  dataSource = ELEMENT_DATA;
  
  constructor(public dialog: MatDialog) {}
    
  ngOnInit(): void {
  }

  openDialog(element: CadastroClientes | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        codigo: null,
        nome: '',
        email: '',
        wathsapp: null
      } : {
        codigo: element.codigo,
        nome: element.nome,
        email: element.email,
        wathsapp: element.wathsapp
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        if (this.dataSource.map(p => p.codigo).includes(result.codigo)) {
          this.dataSource[result.codigo - 1] = result;
          this.table.renderRows();
        } else {
        this.dataSource.push(result);
        this.table.renderRows();
        }
      }     
    });
  }

  editElement(element: CadastroClientes): void {
  this.openDialog(element);
  }

  deleteElement(codigo: number): void {
    this.dataSource = this.dataSource.filter(p => p.codigo !== codigo);
  }
}


