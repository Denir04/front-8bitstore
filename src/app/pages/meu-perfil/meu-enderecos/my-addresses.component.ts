import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.css'],
})
export class MyAddressesComponent implements OnInit {
  myAddresses: Address[] = [];
  loading: boolean = true;
  success: boolean = false;

  constructor(private addressService: AddressService, private router: Router) {}

  ngOnInit(): void {
    this.addressService.getAllAddress('1').subscribe((addressesBack) => {
      this.myAddresses = addressesBack;
      console.log(addressesBack);
      this.loading = false;
    });
  }

  goToViewAddress(id: number) {
    this.router.navigate([`/meu-perfil/enderecos/${id}`]);
  }

  goToNewAddress() {
    this.router.navigate([`/meu-perfil/enderecos/novo`]);
  }
}
