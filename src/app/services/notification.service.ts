import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly API_URL = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient, private customerService: CustomerService) {}

  isHaveNotification(): boolean{
    return sessionStorage.getItem("notifyItems") !== null && sessionStorage.getItem("notifyItems") !== "[]";
  }

  getNotification(): any{
    return JSON.parse(sessionStorage.getItem("notifyItems")|| "[]");
  }

  getUnreadNotifications(): void {
    this.http.get<Notification[]>(`${this.API_URL}/unread?clienteId=${this.customerService.getClienteId()}`).subscribe(
      (data) => {
        sessionStorage.setItem("notifyItems",JSON.stringify(data))
      },
      (err) => console.log(err)
    );
  }

  putReadNotification(): void{
    this.http.put<Notification[]>(`${this.API_URL}/read?clienteId=${this.customerService.getClienteId()}`, {}).subscribe(
      (data) => {
        console.log(data);
        sessionStorage.removeItem("notifyItems");
      },
      (err) => console.log(err)
    );
  }
}