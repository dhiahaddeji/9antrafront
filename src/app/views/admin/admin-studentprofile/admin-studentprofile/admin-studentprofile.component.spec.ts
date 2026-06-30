import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentprofileComponent } from './admin-studentprofile.component';

describe('AdminStudentprofileComponent', () => {
  let component: AdminStudentprofileComponent;
  let fixture: ComponentFixture<AdminStudentprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStudentprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
