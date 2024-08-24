import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { customPatterns } from 'src/app/core/patterns';
import { AddressService } from 'src/app/services/address.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.css'],
})
export class NewAddressComponent implements OnInit {
  addressForm: FormGroup = new FormGroup({});
  customPatterns = customPatterns;
  submitted = false;
  loading = false;
  success = false;
  error = false;

  constructor(
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      apelido: ['', Validators.required],
      tipoResidencia: ['', Validators.required],
      tipoLogradouro: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      pais: ['', Validators.required],
      observacoes: [''],
      cobranca: [''],
      entrega: [''],
      residencial: [''],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addressForm.valid) {
      this.loading = true;
      this.addressService
        .postNewAddress(this.addressForm.value)
        .subscribe((response) => {
          response.ok ? (this.success = true) : (this.error = true);
          this.loading = false;
        });
    }
  }

  onBack() {
    this.location.back();
  }
}
