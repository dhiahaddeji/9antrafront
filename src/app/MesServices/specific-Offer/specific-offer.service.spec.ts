import { TestBed } from '@angular/core/testing';

import { SpecificOfferService } from './specific-offer.service';

describe('SpecificOfferService', () => {
  let service: SpecificOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
