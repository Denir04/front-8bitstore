import { customPatterns } from 'src/app/core/patterns';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { Location } from '@angular/common';

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

  constructor(
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.addressService.getOneAddress('1', '4').subscribe((address) => {
      this.addressForm = this.formBuilder.group({
        apelido: [address.apelido, Validators.required],
        tipoResidencia: [address.tipo_residencia, Validators.required],
        tipoLogradouro: [address.tipo_logradouro, Validators.required],
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

      this.loading = false;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addressForm.valid) {
      this.success = true;
    }
  }

  onBack() {
    this.location.back();
  }

  onDelete() {
    this.confirmDelete = false;
    this.success = true;
  }
}
