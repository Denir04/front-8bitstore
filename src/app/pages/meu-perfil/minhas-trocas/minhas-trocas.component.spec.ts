import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasTrocasComponent } from './minhas-trocas.component';

describe('MinhasTrocasComponent', () => {
  let component: MinhasTrocasComponent;
  let fixture: ComponentFixture<MinhasTrocasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinhasTrocasComponent]
    });
    fixture = TestBed.createComponent(MinhasTrocasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
