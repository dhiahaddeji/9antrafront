import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachStudentProjectsComponent } from './coach-student-projects.component';

describe('CoachStudentProjectsComponent', () => {
  let component: CoachStudentProjectsComponent;
  let fixture: ComponentFixture<CoachStudentProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachStudentProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachStudentProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
