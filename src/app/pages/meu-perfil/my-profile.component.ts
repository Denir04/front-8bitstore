import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customPatterns } from 'src/app/core/patterns';
import { ErrorMsgs } from 'src/app/models/errorMsgs';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  customerForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});

  customerId: string = '';
  customPatterns = customPatterns;
  submitted: boolean = false;
  changeOnlyPassword: boolean = false;
  loading: boolean = true;
  success: boolean = false;  
  error: boolean = false;
  showPassword: boolean = false;
  showPasswordAgain: boolean = false;
  errorMsgs: ErrorMsgs = {
    cpf: '',
    data_nascimento: '',
    email: '',
    genero: '',
    nome_completo: '',
    senha: '',
    senha_novamente: '',
    telefone: '',
    "endereco_residencial.apelido": '',
    "endereco_residencial.bairro": '',
    "endereco_residencial.cep": '',
    "endereco_residencial.cidade": '',
    "endereco_residencial.estado": '',
    "endereco_residencial.logradouro": '',
    "endereco_residencial.numero": '',
    "endereco_residencial.observacoes": '',
    "endereco_residencial.pais": '',
    "endereco_residencial.tipo_logradouro": '',
    "endereco_residencial.tipo_residencia": ''
  };
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.customerService.getPersonalData('1').subscribe((customerBack) => {
      this.customerId = customerBack.id;
      this.customerForm = this.formBuilder.group({
        nome_completo: [customerBack.nome_completo, Validators.required],
        data_nascimento: [customerBack.data_nascimento, Validators.required],
        telefone: [customerBack.telefone, Validators.required],
        cpf: [customerBack.cpf, Validators.required],
        genero: [customerBack.genero, Validators.required],
        email: [customerBack.email, Validators.required],
      });
      this.loading = false;
    }, (err) => {
      this.error = true;
      this.loading = false;
    });

    this.passwordForm = this.formBuilder.group({
      senha: ['', Validators.required],
      senha_novamente: ['', Validators.required],
    });
  }

  onReloadPage(){
    window.location.reload();
  }

  onSubmit(type: string) {
    this.changeOnlyPassword = false;
    this.loading = true;
    if (type === 'password') {
      this.customerService.updatePassword({...this.passwordForm.value, id: this.customerId}).subscribe(
        (res) => {
          this.loading = false;
          this.success = true;
          this.passwordForm.reset();
        },
        ({error, status}) => {
          if(status === 400) {
            this.changeOnlyPassword = true;
            this.errorMsgs = error;
          }
          else this.error = true;
          this.loading = false;
        }
      )
    }else{
      this.customerService.updatePersonalData({...this.customerForm.value, id: this.customerId}).subscribe(
        (res) => {
          this.success = true;
          this.loading = false;
        },
        ({error, status}) => {
          if(status === 400) this.errorMsgs = error;
          else this.error = true;
          this.loading = false;
        }
      )
    }
  }
}
