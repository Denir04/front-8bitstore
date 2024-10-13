import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/address';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl: string = 'http://localhost:8080';
  constructor(
    private http: HttpClient,
    private customerService: CustomerService
  ) {}

  getAllAddress(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiUrl}/endereco?clienteId=${this.customerService.getClienteId()}`);
  }

  getOneAddress(customerId: string, addressId: string): Observable<Address> {
    return this.http.get<Address>(
      `${this.apiUrl}/endereco/detalhes?clienteId=${this.customerService.getClienteId()}&enderecoId=${addressId}`
    );
  }

  postNewAddress(newAddress: Address,clienteId: string): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/endereco?clienteId=${this.customerService.getClienteId()}`, newAddress, {
      observe: 'response',
    });
  }

  updateAddress(newAddress: Address, id: string): Observable<HttpResponse<any>>{
    return this.http.put(`${this.apiUrl}/endereco?clienteId=${this.customerService.getClienteId()}`, newAddress, {observe: 'response'});
  }

  deleteAddress(customerId: string,addressId: string):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.apiUrl}/endereco?clienteId=${this.customerService.getClienteId()}&enderecoId=${addressId}`, {observe: 'response'});
  }
}
