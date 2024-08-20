import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl: string = 'http://localhost:8090';

  constructor(private http: HttpClient) {}

  getPersonalData(id: string): Observable<Customer> {
    console.log('chama');
    return this.http.get<Customer>(
      `${this.apiUrl}/meu-perfil/dados-pessoais/${id}`
    );
  }
}
