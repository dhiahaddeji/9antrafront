import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportsUpdateFormComponent } from './admin-reports-update-form.component';

describe('AdminReportsUpdateFormComponent', () => {
  let component: AdminReportsUpdateFormComponent;
  let fixture: ComponentFixture<AdminReportsUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReportsUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReportsUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
