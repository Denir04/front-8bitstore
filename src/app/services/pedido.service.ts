import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl: string = 'http://localhost:8080/pedido';
  constructor(
    private http: HttpClient,
    private customerService: CustomerService
  ) {}

  getMyPedidos(id: string = '1'): Observable<HttpResponse<any>>{
    return this.http.get<any>(`${this.apiUrl}/meus-pedidos?clienteId=${this.customerService.getClienteId()}`, {observe: 'response'});
  }

  getPedidoDetail(id: string):Observable<HttpResponse<any>>{
    return this.http.get<any>(`${this.apiUrl}/detalhes?id=${id}`, {observe: 'response'});
  }

}
