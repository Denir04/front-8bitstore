import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterCustomerComponent } from './pages/cadastrar/register-customer.component';
import { MyProfileComponent } from './pages/meu-perfil/my-profile.component';
import { ProductListComponent } from './pages/home/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MyAddressesComponent } from './pages/meu-perfil/meu-enderecos/my-addresses.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewAddressComponent } from './pages/meu-perfil/meu-enderecos/visualizar/view-address.component';
import { NewAddressComponent } from './pages/meu-perfil/meu-enderecos/novo/new-address.component';
import { MyCardsComponent } from './pages/meu-perfil/meu-cartoes/my-cards.component';
import { NewCardComponent } from './pages/meu-perfil/meu-cartoes/novo/new-card.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterCustomerComponent,
    MyProfileComponent,
    ProductListComponent,
    MyAddressesComponent,
    ViewAddressComponent,
    NewAddressComponent,
    MyCardsComponent,
    NewCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    HttpClientModule,
  ],
  providers: [
    provideNgxMask({
      /* opções de cfg */
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
