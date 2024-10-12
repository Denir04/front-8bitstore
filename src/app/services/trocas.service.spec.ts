import { TestBed } from '@angular/core/testing';

import { TrocasService } from './trocas.service';

describe('TrocasService', () => {
  let service: TrocasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrocasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
