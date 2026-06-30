import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentlistComponent } from './admin-studentlist.component';

describe('AdminStudentlistComponent', () => {
  let component: AdminStudentlistComponent;
  let fixture: ComponentFixture<AdminStudentlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStudentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
