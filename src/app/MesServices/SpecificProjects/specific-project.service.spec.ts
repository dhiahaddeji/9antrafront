import { TestBed } from '@angular/core/testing';

import { SpecificProjectService } from './specific-project.service';

describe('SpecificProjectService', () => {
  let service: SpecificProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
