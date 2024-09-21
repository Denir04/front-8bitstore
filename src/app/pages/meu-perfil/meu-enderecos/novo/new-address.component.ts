import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { customPatterns } from 'src/app/core/patterns';
import { AddressService } from 'src/app/services/address.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorMsgsAddress } from 'src/app/models/errorMsgAdress';
import { IbgeService } from 'src/app/services/external/ibge.service';

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
  estadosIbge: any = [];
  cidadesUfIbge: any = [];
  errorMsgs: ErrorMsgsAddress = {
    apelido: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    logradouro: '',
    numero: '',
    observacoes: '',
    pais: '',
    tipo_logradouro: '',
    tipo_residencia: ''
};

  constructor(
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private ibgeService: IbgeService
  ) {}

  ngOnInit(): void {
    this.estadosIbge = this.ibgeService.getEstados();
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
      cobranca: [''],
      entrega: [''],
      residencial: [''],
    });
  }

  onChangeEstado(){
    this.ibgeService.getAllCidadesByUF(this.addressForm.get('estado')?.value).subscribe(
      (res) => {
        this.cidadesUfIbge = res.body
      },
      (err) => console.log(err)
    )
  }


  onSubmit() {
    this.loading = true;
    this.addressService
      .postNewAddress(this.addressForm.value, '1')
      .subscribe((response) => {
        this.success = true;
        this.loading = false;
      }, ({error, status}) => {
        if(status === 400){
          this.errorMsgs = error;
        } else{
          this.error = true;
        }
        this.loading = false;
      });
  }

  onBack() {
    this.location.back();
  }
}
