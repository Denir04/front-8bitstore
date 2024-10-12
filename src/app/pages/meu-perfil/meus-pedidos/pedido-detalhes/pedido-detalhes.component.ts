import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItensTrocar } from 'src/app/models/itensTrocar';
import { PedidoService } from 'src/app/services/pedido.service';
import { TrocasService } from 'src/app/services/trocas.service';

@Component({
  selector: 'app-pedido-detalhes',
  templateUrl: './pedido-detalhes.component.html',
  styleUrls: ['./pedido-detalhes.component.css']
})
export class PedidoDetalhesComponent implements OnInit {
  pedidoDetail: any = null;
  loading = true;
  loadingTroca = false;
  success = false;
  error = false;

  isModalOpen = false;
  itensTrocar: ItensTrocar|any;

  constructor(
    private pedidoService: PedidoService,
    private trocaService: TrocasService,
    private activedRouter: ActivatedRoute,
    private location: Location
  ){}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }


  ngOnInit(): void {
    const id = this.activedRouter.snapshot.paramMap.get("id") || '';
    this.pedidoService.getPedidoDetail(id).subscribe(
      data => {
        console.log(data);
        this.pedidoDetail = data.body;
        this.itensTrocar = this.pedidoDetail.itens.map((item:any) => ({pedidoProdutoId: item.id, quantidade: 0 }));
        this.loading = false;
      },
      err => {
        this.error = true;
        console.log(err);
        this.loading = false;
      }
    )    
  }

  goBack(){
    this.location.back();
  }

  getItemUnit(id: any){
    const itemTroca = this.itensTrocar.find(((item:any) => item.pedidoProdutoId === id));
    return itemTroca.quantidade;
  }
  addItemUnit(id: any){
    this.itensTrocar.forEach((item:any) => {
        if(item.pedidoProdutoId === id) item.quantidade++;
    });
  }

  removeItemUnit(id: any){
    this.itensTrocar.forEach((item:any) => {
      if(item.pedidoProdutoId === id) item.quantidade--;
    })
  }

  sendTroca(){
    this.loadingTroca = true;
    this.trocaService.postPedidoTroca(1, this.pedidoDetail.id, this.itensTrocar.filter((item:ItensTrocar) => item.quantidade !== 0)).subscribe(
      (data) => {
        console.log(data)
        this.loadingTroca = false;
      },
      (err) => {
        console.error(err);
        this.loadingTroca = false;
      }
    )
    console.log(this.itensTrocar);
  }

}
