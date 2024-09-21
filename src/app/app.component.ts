import { Component, OnInit } from '@angular/core';
import { IbgeService } from './services/external/ibge.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-8bitstore';

  constructor(
    private ibgeService: IbgeService
  ){}

  ngOnInit(): void {
    this.ibgeService.getAllEstadosBr();
  }
}
