import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getAllAddress(id: string): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiUrl}/endereco?clienteId=${id}`);
  }

  getOneAddress(customerId: string, addressId: string): Observable<Address> {
    return this.http.get<Address>(
      `${this.apiUrl}/endereco/detalhes?clienteId=${customerId}&enderecoId=${addressId}`
    );
  }

  postNewAddress(newAddress: Address,clienteId: string): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/endereco?clienteId=${clienteId}`, newAddress, {
      observe: 'response',
    });
  }

  updateAddress(newAddress: Address, id: string): Observable<HttpResponse<any>>{
    return this.http.put(`${this.apiUrl}/endereco?clienteId=${id}`, newAddress, {observe: 'response'});
  }

  deleteAddress(customerId: string,addressId: string):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.apiUrl}/endereco?clienteId=${customerId}&enderecoId=${addressId}`, {observe: 'response'});
  }
}
