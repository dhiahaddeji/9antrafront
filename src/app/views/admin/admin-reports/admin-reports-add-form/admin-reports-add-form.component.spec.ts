import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportsAddFormComponent } from './admin-reports-add-form.component';

describe('AdminReportsAddFormComponent', () => {
  let component: AdminReportsAddFormComponent;
  let fixture: ComponentFixture<AdminReportsAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReportsAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReportsAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
