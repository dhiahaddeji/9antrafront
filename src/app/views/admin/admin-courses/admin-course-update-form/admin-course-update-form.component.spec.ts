import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseUpdateFormComponent } from './admin-course-update-form.component';

describe('AdminCourseUpdateFormComponent', () => {
  let component: AdminCourseUpdateFormComponent;
  let fixture: ComponentFixture<AdminCourseUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCourseUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCourseUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
