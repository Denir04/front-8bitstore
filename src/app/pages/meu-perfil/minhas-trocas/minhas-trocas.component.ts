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
  success = false;
  isModalOpen = false;

  constructor(
    private trocaService: TrocasService,
    public notificationService: NotificationService
  ){}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    window.location.reload();
  }

  confirmSuccess(){
    this.success = false;
    this.closeModal();
  }

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


  cancelarTroca(id: number): void{
    this.trocaService.cancelarTroca(String(id)).subscribe(
      (data) => {
        this.success = true;
        this.openModal();
      },
      (err) => {
        this.success = false;
        this.openModal();
      }
    );
  }
}
