import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CadastroClientes } from '../models/CadastroClientes';

@Injectable()
export class CadastroClientesService {
    elementApiUrl = 'https://localhost:44366/api/CadastroClientes';
  constructor(private http: HttpClient) { }

  getElements(): Observable<CadastroClientes[]> {
      return this.http.get<CadastroClientes[]>(this.elementApiUrl);
  }
}