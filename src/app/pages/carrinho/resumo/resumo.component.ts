import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.css']
})
export class ResumoComponent implements OnInit {
  detail: any;
  loading = true;
  loadingButton = false;
  success = false;
  error = false;
  errorMsg = '';

  constructor(
    private carrinhoService: CarrinhoService,
    private location: Location,
    private router: Router
  ){}
  
  
  ngOnInit(): void {
    
    this.loading = true;
    this.carrinhoService.getPedidoInfo().subscribe(
      (data) => {
        this.detail = data.body;
        if(this.detail["diferenca"] !== 0) this.router.navigate(['carrinho/forma-pagamento']);
        this.loading = false;
      },
      (err) => {
        console.error(err)
        this.loading = false;
      }
    )
  }

  finalizarPedido(){
    this.loadingButton = true;
    this.carrinhoService.createPedido().subscribe((data) => {
      this.loadingButton = false;
      this.success = true;
    },
    (err) => {
      console.log(err);
      this.error = true;
      this.errorMsg = err.error;
      this.loadingButton = false;
    }
  )
  }

  goBack(){
    this.location.back();
  }

  goToMyPedidos(){
    this.router.navigate(['meu-perfil/pedidos']);
  }

  toNumber(text: string){
    return Number(text);
  }
}
