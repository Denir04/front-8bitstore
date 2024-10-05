import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoEntregaComponent } from './endereco-entrega.component';

describe('EnderecoEntregaComponent', () => {
  let component: EnderecoEntregaComponent;
  let fixture: ComponentFixture<EnderecoEntregaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnderecoEntregaComponent]
    });
    fixture = TestBed.createComponent(EnderecoEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
