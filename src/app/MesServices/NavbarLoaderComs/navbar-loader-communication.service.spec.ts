import { TestBed } from '@angular/core/testing';

import { NavbarLoaderCommunicationService } from './navbar-loader-communication.service';

describe('NavbarLoaderCommunicationService', () => {
  let service: NavbarLoaderCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarLoaderCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
