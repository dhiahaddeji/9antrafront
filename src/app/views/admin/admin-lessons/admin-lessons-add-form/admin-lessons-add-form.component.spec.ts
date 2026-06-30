import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLessonsAddFormComponent } from './admin-lessons-add-form.component';

describe('AdminLessonsAddFormComponent', () => {
  let component: AdminLessonsAddFormComponent;
  let fixture: ComponentFixture<AdminLessonsAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLessonsAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLessonsAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
