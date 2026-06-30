import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateprojectownerComponent } from './admin-updateprojectowner.component';

describe('AdminUpdateprojectownerComponent', () => {
  let component: AdminUpdateprojectownerComponent;
  let fixture: ComponentFixture<AdminUpdateprojectownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdateprojectownerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUpdateprojectownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
