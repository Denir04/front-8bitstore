import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/home/product-list.component';
import { RegisterCustomerComponent } from './pages/cadastrar/register-customer.component';
import { MyProfileComponent } from './pages/meu-perfil/my-profile.component';
import { MyAddressesComponent } from './pages/meu-perfil/my-addresses/my-addresses.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ProductListComponent },
  { path: 'cadastrar', component: RegisterCustomerComponent },
  { path: 'meu-perfil', component: MyProfileComponent },
  { path: 'meu-perfil/enderecos', component: MyAddressesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
