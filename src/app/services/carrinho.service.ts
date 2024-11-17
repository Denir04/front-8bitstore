import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private apiUrl: string = 'http://localhost:8080/carrinho';
  constructor(
    private http: HttpClient,
    private customerService: CustomerService
  ) {}

  getPedidoInfo(): Observable<HttpResponse<any>>{
    return this.http.get<any>(this.apiUrl, {withCredentials: true,observe: "response"});
  }

  putCarrinho(item: any): Observable<HttpResponse<any>>{
    return this.http.put<any>(`${this.apiUrl}`, item, {withCredentials: true, observe: "response"});
  }

  selectAddress(addressId: number):Observable<HttpResponse<any>>{
    return this.http.post<any>(`${this.apiUrl}/endereco-entrega?clienteId=${this.customerService.getClienteId()}&enderecoId=${addressId}`,null,{withCredentials: true, observe: 'response'});
  }

  selectCards(itemCard: any): Observable<HttpResponse<any>>{
    return this.http.put<any>(`${this.apiUrl}/cartao`, itemCard, {withCredentials: true, observe: 'response'});
  }

  selectTicket(code: string): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${this.apiUrl}/cupom?clienteId=${this.customerService.getClienteId()}&codigo=${encodeURIComponent(code)}`,null,{withCredentials: true, observe: 'response'});
  }

  removeTicket(code: string): Observable<HttpResponse<any>>{
    return this.http.delete<any>(`${this.apiUrl}/cupom?clienteId=${this.customerService.getClienteId()}&codigo=${encodeURIComponent(code)}`, {withCredentials: true,  observe: 'response'});
  }

  createPedido(id: string = "1") : Observable<HttpResponse<any>>{
    return this.http.post<any>(`${this.apiUrl}/finalizar?clienteId=${this.customerService.getClienteId()}`,null,{withCredentials: true, observe: 'response'});
  }
  
}
