import { customPatterns } from './../../core/patterns';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMsgs } from 'src/app/models/errorMsgs';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css'],
})
export class RegisterCustomerComponent implements OnInit {
  customerForm: FormGroup = new FormGroup({});
  addressForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  customPatterns = customPatterns;
  loading = false;
  success = false;
  error = false;
  errorMsgs: ErrorMsgs = {
    cpf: '',
    data_nascimento: '',
    email: '',
    genero: '',
    nome_completo: '',
    senha: '',
    senha_novamente: '',
    telefone: '',
    "endereco_residencial.apelido": '',
    "endereco_residencial.bairro": '',
    "endereco_residencial.cep": '',
    "endereco_residencial.cidade": '',
    "endereco_residencial.estado": '',
    "endereco_residencial.logradouro": '',
    "endereco_residencial.numero": '',
    "endereco_residencial.observacoes": '',
    "endereco_residencial.pais": '',
    "endereco_residencial.tipo_logradouro": '',
    "endereco_residencial.tipo_residencia": ''
  };

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      nome_completo: ['', Validators.required],
      data_nascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: ['', [Validators.required]],
      genero: [null, Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      senha_novamente: ['', Validators.required],
    });
    this.addressForm = this.formBuilder.group({
      apelido: ['', Validators.required],
      tipo_residencia: [null, Validators.required],
      tipo_logradouro: [null, Validators.required],
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
      this.customerService
        .registerCustomer({...this.customerForm.value, endereco_residencial: {...this.addressForm.value, a: 'a'}})
        .subscribe(res => {
          console.log(res);
          this.success = true;
        }, ({status, error}) => {
          if(status === 400){
            console.log(error);
            this.errorMsgs = error;
          } else{
            this.error = true;
          }
        })
    }

    goHome(){
      this.router.navigate(['/']);
    }
}
