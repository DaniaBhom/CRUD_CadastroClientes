import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { CadastroClientes } from 'src/app/models/CadastroClientes';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

const ELEMENT_DATA: CadastroClientes[] = [
  {codigo: 1, nome: 'José Almeida', email: 'dbcodigo@gmail.com', wathsapp: 111111111},
  {codigo: 2, nome: 'Marcos da Costa', email: 'dbcodigo@gmail.com', wathsapp: 222222222},
  {codigo: 3, nome: 'Aline Tavares', email: 'dbcodigo@gmail.com', wathsapp: 3333333333},
  {codigo: 4, nome: 'Karina Silva', email: 'dbcodigo@gmail.com', wathsapp: 444444444},
  {codigo: 5, nome: 'Jéssica Carvalho', email: 'dbcodigo@gmail.com', wathsapp: 555555555},
  {codigo: 6, nome: 'Daniel Carlos', email: 'dbcodigo@gmail.com', wathsapp: 66666666666},
  {codigo: 7, nome: 'Henrique Faria', email: 'dbcodigo@gmail.com', wathsapp: 7777777777},
  {codigo: 8, nome: 'Joao Medeiros', email: 'dbcodigo@gmail.com', wathsapp: 88888888888},
  {codigo: 9, nome: 'Caique Furtado', email: 'dbcodigo@gmail.com', wathsapp: 9999999999},
  {codigo: 10, nome: 'Gilson Almeida', email: 'dbcodigo@gmail.com', wathsapp: 11111111111},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['codigo', 'nome', 'email', 'wathsapp', 'actions'];
  dataSource = ELEMENT_DATA;
  
  constructor(public dialog: MatDialog) { }
    
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


