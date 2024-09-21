import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.css'],
})
export class MyCardsComponent implements OnInit {
  myCards: CreditCard[] = [];
  loading = true;
  success = false;
  error = false;
  loadError = false;
  errorMsg = '';
  confirmDelete = 0;

  constructor(
    private creditCardService: CreditCardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.creditCardService.getAllCreditCard('1').subscribe((response) => {
      response.ok ? (this.myCards = response.body) : (this.error = true);
      this.loading = false;
    }, (error) => {
      this.loadError = true;
      this.loading = false;
    });
  }

  onReloadPage(){
    window.location.reload();
  }

  goToNewCreditCard() {
    this.router.navigate(['meu-perfil/cartoes/novo']);
  }

  onDelete() {
    this.loading = true;
    this.creditCardService.deleteCreditCard(this.confirmDelete, 10).subscribe(
      (response) => {
        if (response.ok) {
          this.success = true;
          this.confirmDelete = 0;
        }
      },
      ({ error }) => {
        this.confirmDelete = 0;
        this.error = true;
        this.errorMsg = error;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
    this.confirmDelete = 0;
  }

  onConfig(id: number) {
    this.loading = true;
    this.creditCardService.configPreferencial(id, 1).subscribe(
      (response) => {
        this.loading = false;
        this.success = true;
      },
      ({ error }) => {
        this.loading = false;
        this.error = true;
        this.errorMsg = error?.errorMsg;
      }
    );
  }
}
