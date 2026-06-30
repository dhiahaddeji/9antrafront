import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestListComponent } from './admin-request-list.component';

describe('AdminRequestListComponent', () => {
  let component: AdminRequestListComponent;
  let fixture: ComponentFixture<AdminRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
