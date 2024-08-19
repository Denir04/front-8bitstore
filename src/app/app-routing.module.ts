import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/home/product-list.component';
import { RegisterCustomerComponent } from './pages/cadastrar/register-customer.component';
import { MyProfileComponent } from './pages/meu-perfil/my-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ProductListComponent },
  { path: 'cadastrar', component: RegisterCustomerComponent },
  { path: 'meu-perfil', component: MyProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
