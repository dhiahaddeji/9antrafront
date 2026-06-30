import { TestBed } from '@angular/core/testing';

import { HackerspacesService } from './hackerspaces.service';

describe('HackerspacesService', () => {
  let service: HackerspacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HackerspacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
