import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { TrocasService } from 'src/app/services/trocas.service';

@Component({
  selector: 'app-minhas-trocas',
  templateUrl: './minhas-trocas.component.html',
  styleUrls: ['./minhas-trocas.component.css']
})
export class MinhasTrocasComponent implements OnInit {
  notifications: any = [];
  loading = true;
  myTrocas:any = [];

  constructor(
    private trocaService: TrocasService,
    public notificationService: NotificationService
  ){}

  ngOnInit(): void {
    this.loading = true;
    this.notifications = this.notificationService.getNotification();
    this.trocaService.getMyTrocas().subscribe(
      (data) => {
        this.myTrocas = data.body;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
    setTimeout(() => {
        this.notificationService.putReadNotification();
    }, 5000);
  }



}
