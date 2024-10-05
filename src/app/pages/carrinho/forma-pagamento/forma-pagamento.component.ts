import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { customPatterns } from 'src/app/core/patterns';
import { CreditCard } from 'src/app/models/credit-card';
import { ErrorMsgsCard } from 'src/app/models/errorMsgCard';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css']
})
export class FormaPagamentoComponent implements OnInit {
  detail: any;
  myCards: CreditCard[] = [];
  selectedCards:any = [];
  loading = true;
  loadingDetail = true;
  error = false;
  cupomText: any;

  //formulario cartao
  isModalOpen = false;
  loadingForm = false;
  creditCardForm: FormGroup = new FormGroup({});
  customPatterns = customPatterns;
  success = false;
  submitted = false;
  errorTicketMsg: any = '';
  errorMsg: ErrorMsgsCard = {
    numero_impresso: '',
    nome_impresso: '',
    cvv: '',
    bandeira: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private creditCardService: CreditCardService,
    private carrinhoService: CarrinhoService,
    private router: Router,
    private location: Location
  ) {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.creditCardForm.reset();
    this.isModalOpen = false;
    this.errorMsg = {
      numero_impresso: '',
      nome_impresso: '',
      cvv: '',
      bandeira: ''
    };
  }

  ngOnInit(): void {
    this.creditCardForm = this.formBuilder.group({
      numero_impresso: [''],
      nome_impresso: [''],
      cvv: [''],
      bandeira: [null],
    });
    this.loading = true;
    this.loadingDetail = true;
    this.carrinhoService.getPedidoInfo().subscribe(
      (data) => {
        this.detail = data.body;
        this.loadingDetail = false;
        if(this.detail["endereco-entrega"] == null || this.detail["carrinho"].length === 0) this.router.navigate(['carrinho/endereco-entrega']);
      },
      (err) => {
        console.error(err)
        this.loadingDetail = false;
      }
    )
    this.creditCardService.getAllCreditCard('1').subscribe((response) => {
      this.myCards = response.body;
      this.selectedCards = this.myCards.map((card) => ({id: card.id, valor: 0, selected: false}));
      this.loading = false;
    }, (error) => {
      this.error = true;
      this.loading = false;
    });
  }

  handleChangeCheck(index: number){
    if(this.selectedCards[index].selected) {
      this.selectedCards[index].selected = false;
      this.selectedCards[index].valor = 0;
    } else this.selectedCards[index].selected = true;
  }

  isSelected(index: number){
    return !this.selectedCards[index].selected;
  }

  sendPayment(index: number){
    console.log(this.selectedCards);
    this.carrinhoService.selectCards(this.selectedCards[index]).subscribe(
      (data) => {
        this.detail.cartoes = data.body.cartoes;
        this.detail["pagamento-total"] = data.body["pagamento-total"];
        this.detail["diferenca"] = data.body["diferenca"]
        this.detail["mensagem_erro"] = data.body["mensagem_erro"];
      },
      (err) => console.error(err)
    )
  }

  selectTicket(){
    this.carrinhoService.selectTicket(this.cupomText).subscribe(
      (data) => {
        this.cupomText = '';
        if(data.body["cupom-troca"]) this.detail["cupom-troca"] = data.body["cupom-troca"];
        if(data.body["cupom-promo"])this.detail["cupom-promo"] = data.body["cupom-promo"];
        this.detail["pagamento-total"] = data.body["pagamento-total"];
        this.detail["diferenca"] = data.body["diferenca"]
      },
      (err) => {
        this.errorTicketMsg = err.error;
        console.error(err)
      } 
    )
  }

  removeTicket(code: string){
    this.carrinhoService.removeTicket(code).subscribe(
      (data) => {
        console.log(data.body);
        this.detail["cupom-troca"] = data.body["cupom-troca"];
        this.detail["cupom-promo"] = data.body["cupom-promo"];
        this.detail["pagamento-total"] = data.body["pagamento-total"];
      },
      (err) => console.error(err)
    );
  }

  removerCard(id: number){
    console.log(id);
    const index = this.selectedCards.findIndex((card:any) => card.id == id);
    console.log(index);
    this.selectedCards[index].valor = 0;
    this.sendPayment(index);
  }

  onSubmit() {
    this.loadingForm = true;
    this.creditCardService
      .postNewCreditCard(this.creditCardForm.value, `1`)
      .subscribe((response) => {
        this.loadingForm = false;
        this.success = true;
        window.location.reload();
      }, ({error, status}) => {
        if(status == 400) this.errorMsg = error;
        else this.error = true;
        this.loadingForm = false;
      });
  }


  goToNextStep(){
    this.router.navigate(['carrinho/resumo']);
  }

  goBack(){
    this.location.back();
  }

  valueAbsulote(valor: any){
    return Math.abs(valor);
  }
}
