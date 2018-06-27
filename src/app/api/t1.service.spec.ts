import { TestBed, inject } from '@angular/core/testing';

import { T1Service } from './t1.service';

describe('T1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [T1Service]
    });
  });

  it('should be created', inject([T1Service], (service: T1Service) => {
    expect(service).toBeTruthy();
  }));
});
