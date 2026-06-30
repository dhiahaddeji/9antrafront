import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLessonsListComponent } from './admin-lessons-list.component';

describe('AdminLessonsListComponent', () => {
  let component: AdminLessonsListComponent;
  let fixture: ComponentFixture<AdminLessonsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLessonsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLessonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
