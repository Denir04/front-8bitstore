import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private apiUrl: string = 'http://localhost:8080/carrinho';
  constructor(private http: HttpClient) {}

  getPedidoInfo(): Observable<HttpResponse<any>>{
    return this.http.get<any>(this.apiUrl, {withCredentials: true,observe: "response"});
  }

  putCarrinho(item: any): Observable<HttpResponse<any>>{
    return this.http.put<any>(`${this.apiUrl}`, item, {withCredentials: true, observe: "response"});
  }

  selectAddress(addressId: number):Observable<HttpResponse<any>>{
    return this.http.post<any>(`${this.apiUrl}/endereco-entrega?clienteId=${1}&enderecoId=${addressId}`,null,{withCredentials: true, observe: 'response'});
  }

  selectCards(itemCard: any): Observable<HttpResponse<any>>{
    return this.http.put<any>(`${this.apiUrl}/cartao`, itemCard, {withCredentials: true, observe: 'response'});
  }

  selectTicket(code: string): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${this.apiUrl}/cupom?codigo=${code}`,null,{withCredentials: true, observe: 'response'});
  }

  removeTicket(code: string): Observable<HttpResponse<any>>{
    return this.http.delete<any>(`${this.apiUrl}/cupom?codigo=${code}`, {withCredentials: true,  observe: 'response'});
  }

  createPedido(id: string = "1") : Observable<HttpResponse<any>>{
    return this.http.post<any>(`${this.apiUrl}/finalizar?clienteId=${id}`,null,{withCredentials: true, observe: 'response'});
  }
  
}
