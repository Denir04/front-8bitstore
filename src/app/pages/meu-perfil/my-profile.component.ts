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
    this.customerForm = this.formBuilder.group({
      nomeCompleto: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: ['', Validators.required],
      genero: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.passwordForm = this.formBuilder.group({
      senha: ['', Validators.required],
      senhaNovamente: ['', Validators.required],
    });

    this.customerService.getPersonalData('1').subscribe((customerBack) => {
      this.customerForm.patchValue({
        nomeCompleto: customerBack.nome_completo,
        dataNascimento: customerBack.data_nascimento,
        telefone: customerBack.telefone,
        cpf: customerBack.cpf,
        genero: customerBack.genero,
        email: customerBack.email,
      });
      this.customerForm.markAllAsTouched();
      this.customerForm.updateValueAndValidity();
      this.loading = false;
    });
  }

  onSubmit(type: string) {
    this.submitted = true;
    console.log(this.customerForm.valid);
    console.log(this.passwordForm.valid);
    if (type === 'password') {
      if (this.passwordForm.valid) {
        this.success = true;
      }
    } else if (this.customerForm.valid) {
      this.success = true;
    }
  }
}
