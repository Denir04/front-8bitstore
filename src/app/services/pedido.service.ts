import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl: string = 'http://localhost:8080/pedido';
  constructor(private http: HttpClient) {}

  getMyPedidos(id: string = '1'): Observable<HttpResponse<any>>{
    return this.http.get<any>(`${this.apiUrl}/meus-pedidos?clienteId=${id}`, {observe: 'response'});
  }

  getPedidoDetail(id: string):Observable<HttpResponse<any>>{
    return this.http.get<any>(`${this.apiUrl}/detalhes?id=${id}`, {observe: 'response'});
  }

}
