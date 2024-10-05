import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  detail: any;
  loading = true;

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loading = true;
    this.carrinhoService.getPedidoInfo().subscribe(
      (data) => {
        console.log(data);
        this.detail = data.body;
        this.loading = false;
      },
      (err) => {
        console.error(err)
        this.loading = false;
      }
    )
  }

  changeItem(id: string, newQuantity: number){
    this.loading = true;
    this.carrinhoService.putCarrinho({produto_id: id, quantidade: newQuantity}).subscribe(
        (data) => {
          this.detail.carrinho = data.body.itens;
          this.detail["valor-item-total"] = data.body["valor-item-total"];
          this.loading = false;
        },
        (err) => {
          console.error(err)
          this.loading = false;
        }
    );
  }

  goToNextStep(){
    this.router.navigate(['carrinho/endereco-entrega'])
  }

}
