import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {
  private ibgeUrl: string = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  private estados: any;
  private cidadesUf: any;

  constructor(
    private http: HttpClient
  ) { }

  getAllEstadosBr(): void{
    this.http.get(`${this.ibgeUrl}?orderBy=nome`, {observe: 'response'}).subscribe(
      (res) => {
        this.estados = res.body
        localStorage.setItem("estados",JSON.stringify(res.body));
      },
      (err) => console.log(err)
    )
  }

  getAllCidadesByUF(uf:string): Observable<any>{
    return this.http.get(`${this.ibgeUrl}/${uf}/municipios`, {observe: 'response'});
  }

  getEstados(){
    return this.estados || JSON.parse(localStorage.getItem("estados")|| "");
  }
}
