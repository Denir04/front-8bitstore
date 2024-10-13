import { Component, OnInit } from '@angular/core';
import { CupomService } from 'src/app/services/cupom.service';

@Component({
  selector: 'app-meus-cupons',
  templateUrl: './meus-cupons.component.html',
  styleUrls: ['./meus-cupons.component.css']
})
export class MeusCuponsComponent implements OnInit {
  myCupons: any = [];
  loading = true;

  constructor(
    private cupomService: CupomService
  ){}

  ngOnInit(): void {
    this.cupomService.getAllCuponsTroca().subscribe(
      (data) => {
        console.log(data);
        this.myCupons = data.body;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    )
  }
}
