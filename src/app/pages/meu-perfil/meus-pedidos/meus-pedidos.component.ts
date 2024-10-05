import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css']
})
export class MeusPedidosComponent implements OnInit {
  loading = true;
  myPedidos: any = [];
  constructor(
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pedidoService.getMyPedidos().subscribe(
      data => {
        this.myPedidos = data.body;
        this.loading = false;
        console.log(data);
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    )
  }

  goToDetail(id: string){
    this.router.navigate([`meu-perfil/pedidos/detalhes/${id}`]);
  }


}
