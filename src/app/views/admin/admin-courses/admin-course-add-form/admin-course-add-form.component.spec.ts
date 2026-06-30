import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseAddFormComponent } from './admin-course-add-form.component';

describe('AdminCourseAddFormComponent', () => {
  let component: AdminCourseAddFormComponent;
  let fixture: ComponentFixture<AdminCourseAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCourseAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCourseAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
