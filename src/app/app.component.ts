import { Component, OnInit } from '@angular/core';
import { IbgeService } from './services/external/ibge.service';
import { interval } from 'rxjs';
import { NotificationService } from './services/notification.service';
import { CustomerService } from './services/customer.service';
import { TrocasService } from './services/trocas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-8bitstore';

  constructor(
    private ibgeService: IbgeService,
    private notificationService: NotificationService,
    private customerService: CustomerService,
    private trocaService: TrocasService
  ){}

  ngOnInit(): void {
    this.ibgeService.getAllEstadosBr();
    this.trocaService.isHaveTrocaSolicitada(this.customerService.getClienteId()).subscribe(
      (data) => {
        if(data.body){
          interval(5000).subscribe(() => {
            this.notificationService.getUnreadNotifications();
          });
        }
      },
      (err) => console.log(err)
    );
  }
}
