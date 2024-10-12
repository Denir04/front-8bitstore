import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItensTrocar } from '../models/itensTrocar';

@Injectable({
  providedIn: 'root'
})
export class TrocasService {
  private apiUrl: string = 'http://localhost:8080/troca';
  constructor(private http: HttpClient) {}

  postPedidoTroca(clienteId: number, pedidoCompraId: number, trocas: ItensTrocar[]):Observable<HttpResponse<any>>{
    return this.http.post<any>(`${this.apiUrl}`,{
        clienteId: clienteId,
        pedidoId: pedidoCompraId,
        itensTrocar: trocas
    },{observe: 'response'});
  }

  getMyTrocas(id: string = '1'): Observable<HttpResponse<any>>{
    return this.http.get<any>(`${this.apiUrl}/minhas-trocas?clienteId=${id}`, {observe: 'response'});
  }
}
