import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl: string = 'http://localhost:8080/cliente';

  constructor(private http: HttpClient) {}

  registerCustomer(newCustomer: Customer): Observable<HttpResponse<any>>{
    return this.http.post(`${this.apiUrl}`, newCustomer, {observe: 'response'})
  }

  getPersonalData(id: string): Observable<Customer> {
    return this.http.get<Customer>(
      `${this.apiUrl}/visualizar?clienteId=${id}`
    );
  }

  updatePersonalData(customerUp: Customer): Observable<HttpResponse<any>>{
    return this.http.put(`${this.apiUrl}`,customerUp, {observe: 'response'});
  }

  updatePassword(customerUp: Customer):Observable<HttpResponse<any>>{
    return this.http.put(`${this.apiUrl}/senha`,customerUp, {observe: 'response'});
  }
}
