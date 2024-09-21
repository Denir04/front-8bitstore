import { customPatterns } from 'src/app/core/patterns';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMsgsAddress } from 'src/app/models/errorMsgAdress';
import { IbgeService } from 'src/app/services/external/ibge.service';

@Component({
  selector: 'app-view-address',
  templateUrl: './view-address.component.html',
  styleUrls: ['./view-address.component.css'],
})
export class ViewAddressComponent implements OnInit {
  addressForm: FormGroup = new FormGroup({});
  customPatterns = customPatterns;
  submitted = false;
  loading = true;
  success = false;
  confirmDelete = false;
  error = false;
  errorMsg = '';
  enderecoId: string = '';
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
    private activedRouter: ActivatedRoute,
    private router: Router,
    private ibgeService: IbgeService
  ) {}

  ngOnInit(): void {
    this.estadosIbge = this.ibgeService.getEstados();
    this.enderecoId = this.activedRouter.snapshot.paramMap.get('id') || '';
    this.addressService.getOneAddress('1', `${this.enderecoId}`).subscribe((address) => {
      this.addressForm = this.formBuilder.group({
        apelido: [address.apelido, Validators.required],
        tipo_residencia: [address.tipo_residencia, Validators.required],
        tipo_logradouro: [address.tipo_logradouro, Validators.required],
        logradouro: [address.logradouro, Validators.required],
        numero: [address.numero, Validators.required],
        bairro: [address.bairro, Validators.required],
        cep: [address.cep, Validators.required],
        cidade: [address.cidade, Validators.required],
        estado: [address.estado, Validators.required],
        pais: [address.pais, Validators.required],
        observacoes: [address.observacoes],
        cobranca: [address.cobranca],
        entrega: [address.entrega],
        residencial: [address.residencial],
      });
      if(address.residencial) this.addressForm.get('residencial')?.disable();
      if(address.entrega) this.addressForm.get('entrega')?.disable();
      if(address.cobranca) this.addressForm.get('cobranca')?.disable();
      this.onChangeEstado();
      this.loading = false;
    });
  }

  onSubmit() {
    this.loading = true;
    this.addressService.updateAddress({...this.addressForm.value, id: this.enderecoId}, `1`).subscribe(
      (res) => {
        this.success = true;
        this.loading = false;
      },
      ({status, error}) => {
        console.log(error);
        if(status === 400){
          this.errorMsgs = error;
        } else{
          this.error = true;
        }
        this.loading = false;
      }
    )
  }

  onChangeEstado(){
    this.ibgeService.getAllCidadesByUF(this.addressForm.get('estado')?.value).subscribe(
      (res) => {
        this.cidadesUfIbge = res.body
      },
      (err) => console.log(err)
    )
  }

  onBack() {
    this.location.back();
  }

  onDelete() {
    this.confirmDelete = false;
    this.loading = true;
    this.addressService.deleteAddress('1', this.enderecoId).subscribe(
      (res) => {
        this.success = true;
        this.loading = false;
      },
      (error) => {
        this.errorMsg = error.error;
        this.loading = false;
        this.error = true;
      }
    )
  }
}
