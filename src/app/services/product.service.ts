import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductDetail } from '../models/produtDetail';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = 'http://localhost:8080/produto';
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<HttpResponse<any>>{
    return this.http.get<Product[]>(this.apiUrl, {observe: "response"});
  }

  getAllProductsQuery(query: string):Observable<HttpResponse<any>>{
    return this.http.get<Product[]>(`${this.apiUrl}?${query}`, { observe: "response"});
  }

  getProductsMetadados():Observable<HttpResponse<any>>{
    return this.http.get<any>(`${this.apiUrl}/metadados`, {observe:'response'});
  }

  getProductDetail(id: number):Observable<HttpResponse<any>>{
    return this.http.get<ProductDetail>(`${this.apiUrl}/detalhes?id=${id}`, {observe: 'response', withCredentials: true});
  }

}
