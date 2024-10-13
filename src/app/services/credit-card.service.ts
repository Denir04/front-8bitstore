import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/credit-card';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  private apiUrl: string = 'http://localhost:8080/cartao';
  constructor(
    private http: HttpClient,
    private customerService: CustomerService
  ) {}

  getAllCreditCard(id: string): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}?clienteId=${this.customerService.getClienteId()}`, {
      observe: 'response',
    });
  }

  postNewCreditCard(newCreditCard: CreditCard, id: string): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}?clienteId=${this.customerService.getClienteId()}`, newCreditCard, {
      observe: 'response',
    });
  }

  deleteCreditCard(
    cardId: number,
    customerId: number
  ): Observable<HttpResponse<any>> {
    return this.http.delete(
      `${this.apiUrl}?clienteId=${this.customerService.getClienteId()}&cartaoId=${cardId}`,
      { observe: 'response' }
    );
  }

  configPreferencial(
    cardId: number,
    customerId: number
  ): Observable<HttpResponse<any>> {
    return this.http.put(
      `${this.apiUrl}?clienteId=${this.customerService.getClienteId()}&cartaoId=${cardId}`,
      null,
      { observe: 'response' }
    );
  }
}
