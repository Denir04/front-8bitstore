import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/home/product-list.component';
import { RegisterCustomerComponent } from './pages/cadastrar/register-customer.component';
import { MyProfileComponent } from './pages/meu-perfil/my-profile.component';
import { MyAddressesComponent } from './pages/meu-perfil/meu-enderecos/my-addresses.component';
import { ViewAddressComponent } from './pages/meu-perfil/meu-enderecos/visualizar/view-address.component';
import { NewAddressComponent } from './pages/meu-perfil/meu-enderecos/novo/new-address.component';
import { MyCardsComponent } from './pages/meu-perfil/meu-cartoes/my-cards.component';
import { NewCardComponent } from './pages/meu-perfil/meu-cartoes/novo/new-card.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { EnderecoEntregaComponent } from './pages/carrinho/endereco-entrega/endereco-entrega.component';
import { FormaPagamentoComponent } from './pages/carrinho/forma-pagamento/forma-pagamento.component';
import { ResumoComponent } from './pages/carrinho/resumo/resumo.component';
import { MeusPedidosComponent } from './pages/meu-perfil/meus-pedidos/meus-pedidos.component';
import { PedidoDetalhesComponent } from './pages/meu-perfil/meus-pedidos/pedido-detalhes/pedido-detalhes.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ProductListComponent },
  { path: 'produto/:id', component: ProdutoComponent},
  { path: 'carrinho', component: CarrinhoComponent},
  { path: 'carrinho/endereco-entrega', component: EnderecoEntregaComponent},
  { path: 'carrinho/forma-pagamento', component: FormaPagamentoComponent},
  { path: 'carrinho/resumo', component: ResumoComponent},
  { path: 'cadastrar', component: RegisterCustomerComponent },
  { path: 'meu-perfil', component: MyProfileComponent },
  { path: 'meu-perfil/enderecos', component: MyAddressesComponent },
  { path: 'meu-perfil/enderecos/novo', component: NewAddressComponent },
  { path: 'meu-perfil/enderecos/:id', component: ViewAddressComponent },
  { path: 'meu-perfil/cartoes', component: MyCardsComponent },
  { path: 'meu-perfil/cartoes/novo', component: NewCardComponent },
  { path: 'meu-perfil/pedidos', component: MeusPedidosComponent},
  { path: 'meu-perfil/pedidos/detalhes/:id', component: PedidoDetalhesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
