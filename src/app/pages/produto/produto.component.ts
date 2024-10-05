import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetail } from 'src/app/models/produtDetail';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  productDetail: ProductDetail |any;
  loading = true;
  success = false;
  error = false;

  constructor(
    private productService: ProductService, 
    private carrinhoService: CarrinhoService,
    private activedRoute: ActivatedRoute,
    private location: Location
  ){}

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.paramMap.get('id');
    this.loading = true;
    this.productService.getProductDetail(Number(id)).subscribe(
      (data) => {
        this.productDetail = data.body;
        this.loading = false;
      },
      (err) => {
        console.log(err)
        this.loading = false;
      }
    )
  }

  addCarrinho(){
    console.log("addCarrinho")
    this.carrinhoService.putCarrinho({produto_id: this.productDetail.id, quantidade: Number(this.productDetail.quantidade_carrinho)})
    .subscribe(
      (data) => {
        console.log(data);
        this.success = true;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  goBack(){
    this.location.back();
  }

}
