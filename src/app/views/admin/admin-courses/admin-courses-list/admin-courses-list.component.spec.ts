import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoursesListComponent } from './admin-courses-list.component';

describe('AdminCoursesListComponent', () => {
  let component: AdminCoursesListComponent;
  let fixture: ComponentFixture<AdminCoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCoursesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
