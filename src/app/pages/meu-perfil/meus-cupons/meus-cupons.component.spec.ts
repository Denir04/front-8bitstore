import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusCuponsComponent } from './meus-cupons.component';

describe('MeusCuponsComponent', () => {
  let component: MeusCuponsComponent;
  let fixture: ComponentFixture<MeusCuponsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeusCuponsComponent]
    });
    fixture = TestBed.createComponent(MeusCuponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
