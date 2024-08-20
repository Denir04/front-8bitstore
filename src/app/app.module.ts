import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterCustomerComponent } from './pages/cadastrar/register-customer.component';
import { MyProfileComponent } from './pages/meu-perfil/my-profile.component';
import { ProductListComponent } from './pages/home/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MyAddressesComponent } from './pages/meu-perfil/my-addresses/my-addresses.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RegisterCustomerComponent,
    MyProfileComponent,
    ProductListComponent,
    MyAddressesComponent,
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
