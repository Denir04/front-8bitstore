import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { customPatterns } from 'src/app/core/patterns';
import { Address } from 'src/app/models/address';
import { ErrorMsgsAddress } from 'src/app/models/errorMsgAdress';
import { AddressService } from 'src/app/services/address.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { IbgeService } from 'src/app/services/external/ibge.service';

@Component({
  selector: 'app-endereco-entrega',
  templateUrl: './endereco-entrega.component.html',
  styleUrls: ['./endereco-entrega.component.css']
})
export class EnderecoEntregaComponent implements OnInit {
  selectedAddress: Address|any;
  myAddresses: Address[] = [];
  loading = true;
  error = false;
  success = false;
  detail: any;

  //formulario endereco
  isModalOpen = false;
  loadingForm = false;
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
  addressForm: FormGroup = new FormGroup({});
  customPatterns = customPatterns;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.addressForm.reset();
    this.isModalOpen = false;
    this.errorMsgs = {
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
  }

  constructor(
    private addressService: AddressService,
    private carrinhoService: CarrinhoService,
    private router: Router,
    private location: Location,
    private ibgeService: IbgeService,
    private formBuilder: FormBuilder
  ){}

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
    this.loading = true;
    this.carrinhoService.getPedidoInfo().subscribe(
      (data) => {
        this.detail = data.body;
        this.loading = false;
        if(this.detail["carrinho"].length === 0) this.router.navigate(['carrinho']);
      },
      (err) => {
        console.error(err)
        this.loading = false;
      }
    )

    this.addressService.getAllAddress('1').subscribe((addressesBack) => {
      this.myAddresses = addressesBack;
      this.selectedAddress = this.myAddresses.find(address => address.entrega);
      this.carrinhoService.selectAddress(this.selectedAddress.id).subscribe(
        (res) => {
          this.detail.frete = res.body.frete;
          this.loading = false;
        },
        (err) => {
          console.error(err);
          this.loading = false;
        }
      );
    }, (error) => {
      this.error = true;
      this.loading = false;
    });
  }

  changeAddress(id: number){
    this.carrinhoService.selectAddress(id).subscribe(
      (res) => {
        this.detail.frete = res.body.frete;
        this.loading = false;
      },
      (err) => {
        console.error(err);
        this.loading = false;
      }
    );
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
    this.loadingForm = true;
    this.addressService
      .postNewAddress(this.addressForm.value, '1')
      .subscribe((response) => {
        this.success = true;
        this.closeModal();
        window.location.reload();
        this.loadingForm = false;
      }, ({error, status}) => {
        if(status === 400){
          this.errorMsgs = error;
        } else{
          this.error = true;
        }
        this.loadingForm = false;
      });
  }

  goToNextStep(){
    this.router.navigate(['carrinho/forma-pagamento']);
  }

  goBack(){
    this.location.back();
  }
}
