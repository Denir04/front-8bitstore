import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido-detalhes',
  templateUrl: './pedido-detalhes.component.html',
  styleUrls: ['./pedido-detalhes.component.css']
})
export class PedidoDetalhesComponent implements OnInit {
  pedidoDetail: any = null;
  loading = true;
  success = false;
  error = false;

  constructor(
    private pedidoService: PedidoService,
    private activedRouter: ActivatedRoute,
    private location: Location
  ){}


  ngOnInit(): void {
    const id = this.activedRouter.snapshot.paramMap.get("id") || '';
    this.pedidoService.getPedidoDetail(id).subscribe(
      data => {
        console.log(data);
        this.pedidoDetail = data.body;
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

}
