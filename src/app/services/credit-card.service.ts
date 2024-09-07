import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/credit-card';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  private apiUrl: string = 'http://localhost:8080/cartao';
  constructor(private http: HttpClient) {}

  getAllCreditCard(id: string): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}?clienteId=${id}`, {
      observe: 'response',
    });
  }

  postNewCreditCard(newCreditCard: CreditCard, id: string): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}?clienteId=${id}`, newCreditCard, {
      observe: 'response',
    });
  }

  deleteCreditCard(
    cardId: number,
    customerId: number
  ): Observable<HttpResponse<any>> {
    return this.http.delete(
      `${this.apiUrl}?clienteId=${customerId}&cartaoId=${cardId}`,
      { observe: 'response' }
    );
  }

  configPreferencial(
    cardId: number,
    customerId: number
  ): Observable<HttpResponse<any>> {
    return this.http.put(
      `${this.apiUrl}?clienteId=${customerId}&cartaoId=${cardId}`,
      null,
      { observe: 'response' }
    );
  }
}
