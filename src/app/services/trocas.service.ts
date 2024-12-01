import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItensTrocar } from '../models/itensTrocar';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class TrocasService {
  private apiUrl: string = 'http://localhost:8080/troca';
  constructor(
    private http: HttpClient,
    private customerService: CustomerService
  ) {}

  postPedidoTroca(clienteId: number, pedidoCompraId: number, trocas: ItensTrocar[]):Observable<HttpResponse<any>>{
    return this.http.post<any>(`${this.apiUrl}`,{
        clienteId: this.customerService.getClienteId(),
        pedidoId: pedidoCompraId,
        itensTrocar: trocas
    },{observe: 'response'});
  }

  getMyTrocas(id: string = '1'): Observable<HttpResponse<any>>{
    return this.http.get<any>(`${this.apiUrl}/minhas-trocas?clienteId=${this.customerService.getClienteId()}`, {observe: 'response'});
  }

  cancelarTroca(pedidoTrocaId: string):Observable<HttpResponse<any>>{
    return this.http.put<any>(`${this.apiUrl}/alterar-status?pedidoId=${pedidoTrocaId}&codigo=7`, {}, {observe: 'response'});
  }
}
