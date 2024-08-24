import { CreditCardService } from './../../../../services/credit-card.service';
import { Location } from '@angular/common';
import { customPatterns } from 'src/app/core/patterns';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css'],
})
export class NewCardComponent {
  creditCardForm: FormGroup = new FormGroup({});
  customPatterns = customPatterns;
  loading = false;
  success = false;
  submitted = false;
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private creditCardService: CreditCardService
  ) {}

  ngOnInit(): void {
    this.creditCardForm = this.formBuilder.group({
      numeroImpresso: ['', Validators.required],
      nomeImpresso: ['', Validators.required],
      cvv: ['', Validators.required],
      bandeira: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.creditCardForm.valid) return;
    this.loading = true;
    this.creditCardService
      .postNewCreditCard(this.creditCardForm.value)
      .subscribe((response) => {
        if (response.ok) this.success = true;
        else this.error = true;
        this.loading = false;
      });
  }

  onBack() {
    this.location.back();
  }
}
