import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/credit-card';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  private apiUrl: string = 'http://localhost:8090/meu-perfil';
  constructor(private http: HttpClient) {}

  getAllCreditCard(id: string): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/meus-cartoes/${id}`, {
      observe: 'response',
    });
  }

  postNewCreditCard(newCreditCard: CreditCard): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/meus-cartoes/novo`, newCreditCard, {
      observe: 'response',
    });
  }

  deleteCreditCard(
    cardId: number,
    customerId: number
  ): Observable<HttpResponse<any>> {
    return this.http.delete(
      `${this.apiUrl}/meus-cartoes/${customerId}/excluir/${cardId}`,
      { observe: 'response' }
    );
  }

  configPreferencial(
    cardId: number,
    customerId: number
  ): Observable<HttpResponse<any>> {
    return this.http.put(
      `${this.apiUrl}/meus-cartoes/${customerId}/preferencial/${cardId}`,
      null,
      { observe: 'response' }
    );
  }
}
