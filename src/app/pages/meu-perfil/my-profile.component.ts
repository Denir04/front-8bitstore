import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customPatterns } from 'src/app/core/patterns';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  customerForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});

  customPatterns = customPatterns;
  submitted: boolean = false;
  changeOnlyPassword: boolean = false;
  loading: boolean = true;
  success: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerService.getPersonalData('1').subscribe((customerBack) => {
      this.customerForm = this.formBuilder.group({
        nomeCompleto: [customerBack.nome_completo, Validators.required],
        dataNascimento: [customerBack.data_nascimento, Validators.required],
        telefone: [customerBack.telefone, Validators.required],
        cpf: [customerBack.cpf, Validators.required],
        genero: [customerBack.genero, Validators.required],
        email: [customerBack.email, Validators.required],
      });
      this.loading = false;
    });

    this.passwordForm = this.formBuilder.group({
      senha: ['', Validators.required],
      senhaNovamente: ['', Validators.required],
    });
  }

  onSubmit(type: string) {
    if (type === 'password') {
      if (this.passwordForm.valid) {
        this.success = true;
        this.passwordForm.reset();
      }
    } else if (this.customerForm.valid) {
      this.success = true;
    }
  }
}
