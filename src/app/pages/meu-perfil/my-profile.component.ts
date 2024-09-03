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
  errorMsgs: ErrorMsgs|undefined;
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
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
    if (type === 'password') {
      this.success = true;
      this.passwordForm.reset();
      
    }else{
      this.loading = true;
      this.customerService.updatePersonalData({...this.customerForm.value, id: this.customerId}).subscribe(
        (res) => {
          this.success = true;
          this.loading = false;
        },
        ({error, status}) => {
          console.log(error, status)
          if(status === 400) this.errorMsgs = error;
          else this.error = true;
          this.loading = false;
        }
      )
    }
  }
}
