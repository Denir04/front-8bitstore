import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class CupomService {
  private apiUrl: string = 'http://localhost:8080/cupom';
  constructor(
    private http: HttpClient,
    private customerService: CustomerService
  ) {}

  getAllCuponsTroca(id: string = '1'): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}?clienteId=${this.customerService.getClienteId()}`, {
      observe: 'response',
    });
  }
}
