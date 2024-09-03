import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  registerCustomer(newCustomer: Customer): Observable<HttpResponse<any>>{
    return this.http.post(`${this.apiUrl}/cliente`, newCustomer, {observe: 'response'})
  }

  getPersonalData(id: string): Observable<Customer> {
    return this.http.get<Customer>(
      `${this.apiUrl}/cliente/visualizar?clienteId=${id}`
    );
  }

  updatePersonalData(customerUp: Customer): Observable<HttpResponse<any>>{
    return this.http.put(`${this.apiUrl}/cliente`,customerUp, {observe: 'response'});
  }
}
