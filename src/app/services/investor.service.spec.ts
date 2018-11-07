import { TestBed } from '@angular/core/testing';

import { InvestorService } from './investor.service';

describe('InvestorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvestorService = TestBed.get(InvestorService);
    expect(service).toBeTruthy();
  });
});
