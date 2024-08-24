import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl: string = 'http://localhost:8090/meu-perfil';
  constructor(private http: HttpClient) {}

  getAllAddress(id: string): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiUrl}/meus-enderecos/${id}`);
  }

  getOneAddress(customerId: string, addressId: string): Observable<Address> {
    return this.http.get<Address>(
      `${this.apiUrl}/meus-enderecos/${customerId}/visualizar/${addressId}`
    );
  }

  postNewAddress(newAddress: Address): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/meus-enderecos/novo`, newAddress, {
      observe: 'response',
    });
  }
}
