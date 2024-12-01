import { CreditCardService } from './../../../../services/credit-card.service';
import { Location } from '@angular/common';
import { customPatterns } from 'src/app/core/patterns';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ErrorMsgsCard } from 'src/app/models/errorMsgCard';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css'],
})
export class NewCardComponent {
  creditCardForm: FormGroup = new FormGroup({});
  bandeiras: any = [];
  customPatterns = customPatterns;
  loading = false;
  success = false;
  submitted = false;
  error = false;
  errorMsg: ErrorMsgsCard = {
    numero_impresso: '',
    nome_impresso: '',
    cvv: '',
    bandeira: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private creditCardService: CreditCardService,
    public notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.creditCardForm = this.formBuilder.group({
      numero_impresso: ['', Validators.required],
      nome_impresso: ['', Validators.required],
      cvv: ['', Validators.required],
      bandeira: [null, Validators.required],
    });
    this.creditCardService.getAllBandeiras().subscribe(
      (data) => {
        console.log(data);
        this.bandeiras = data.body;
      },
      (err) =>  console.error(err)
    );
  }
  

  onSubmit() {
    this.loading = true;
    this.creditCardService
      .postNewCreditCard(this.creditCardForm.value, `1`)
      .subscribe((response) => {
        this.loading = false;
        this.success = true;
      }, ({error, status}) => {
        if(status == 400) this.errorMsg = error;
        else this.error = true;
        this.loading = false;
      });
  }

  onBack() {
    this.location.back();
  }
}
