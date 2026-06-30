import { TestBed } from '@angular/core/testing';

import { AdminProjectsService } from './admin-projects.service';

describe('AdminProjectsService', () => {
  let service: AdminProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
