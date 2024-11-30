import { Component, OnInit } from '@angular/core';
import { IbgeService } from './services/external/ibge.service';
import { interval } from 'rxjs';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-8bitstore';

  constructor(
    private ibgeService: IbgeService,
    private notificationService: NotificationService
  ){}

  ngOnInit(): void {
    this.ibgeService.getAllEstadosBr();
    interval(5000).subscribe(() => {
      this.notificationService.getUnreadNotifications();
    });
  }
}
