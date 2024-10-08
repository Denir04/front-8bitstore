import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { customPatterns } from 'src/app/core/patterns';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup = new FormGroup({});
  categoriasList: any;
  plataformasList: any;
  desenvolvedorasList: any;
  customPatterns = customPatterns;
  loading = true;
  success = false;
  error = false;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      isbn: '',
      titulo : '',
      anoMin : '',
      anoMax : '',
      faixaEtariaMin: '',
      faixaEtariaMax: '',
      minJogadores: '',
      maxJogadores: '',
      custoMin: '',
      custoMax: '',
      categorias: [[]],
      desenvolvedoras: [[]],
      plataformas: [[]]
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data.body.content;
      this.loading = false;
    },
    (err) => {
      console.log(err)
      this.loading = false;
    })
    this.productService.getProductsMetadados().subscribe(
      (data) => {
        this.plataformasList = data.body.plataformaList;
        this.categoriasList = data.body.categoriaList;
        this.desenvolvedorasList = data.body.desenvolvedoraList;
      },
      (err) => {
        console.error(err);
      } 
    )
  }

  goToDetail(id: number){
    this.router.navigate([`produto/${id}`]);
  }

  onSubmit(){
    const queryParams = this.toQueryParams(this.productForm.value);
    this.loading = true;
    this.productService.getAllProductsQuery(queryParams).subscribe(
      (res) => {
        console.log(res);
        this.products = res.body.content;
        this.loading = false;
      },
      (err) => {
        console.error(err);
        this.error = true;
        this.loading = false;
      }
    )
  }

  onClear(){
    this.productForm.reset({});
    this.ngOnInit();
  }

  onSelectionChange(event: any, itemId: number, itemType: string) {
    const formArray = this.productForm.get(itemType)?.value as number[];
    if (event.target.checked) {
      formArray.push(itemId);
    } else {
      const index = formArray.indexOf(itemId);
      if (index > -1) {
        formArray.splice(index, 1);
      }
    }
    this.productForm.patchValue({
      [itemType]: formArray
    });
  }

  toQueryParams(formValue: any): string {
    return Object.keys(formValue)
      .filter((key) => !!formValue[key]) 
      .map((key) => {
        const value = formValue[key];
        if (Array.isArray(value)) {
          return encodeURIComponent(key) + '=' + value.join(',');
        } else {
          return encodeURIComponent(key) + '=' + encodeURIComponent(value);
        }
      })
      .join('&');
  }

}
