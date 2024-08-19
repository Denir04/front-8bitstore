import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css'],
})
export class RegisterCustomerComponent implements OnInit {
  customerForm: FormGroup = new FormGroup({});
  addressForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  customPatterns = { S: { pattern: new RegExp('[a-zA-ZÀ-ÿ0-9 ]') } };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      nomeCompleto: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.email]],
      genero: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      senhaNovamente: ['', Validators.required],
    });
    this.addressForm = this.formBuilder.group({
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
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.customerForm.value);
  }
}
