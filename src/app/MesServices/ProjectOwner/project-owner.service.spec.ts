import { TestBed } from '@angular/core/testing';

import { ProjectOwnerService } from './project-owner.service';

describe('ProjectOwnerService', () => {
  let service: ProjectOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
