import { Component, OnInit } from '@angular/core';
import { TrocasService } from 'src/app/services/trocas.service';

@Component({
  selector: 'app-minhas-trocas',
  templateUrl: './minhas-trocas.component.html',
  styleUrls: ['./minhas-trocas.component.css']
})
export class MinhasTrocasComponent implements OnInit {
  loading = true;
  myTrocas:any = [];

  constructor(
    private trocaService: TrocasService
  ){}

  ngOnInit(): void {
    this.loading = true;
    this.trocaService.getMyTrocas().subscribe(
      (data) => {
        this.myTrocas = data.body;
        console.log(data);
        this.loading = false;
      },
      (err) => {
        console.error(err);
        this.loading = false;
      }
    )
  }



}
