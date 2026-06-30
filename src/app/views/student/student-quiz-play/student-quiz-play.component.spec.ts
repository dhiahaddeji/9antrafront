import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQuizPlayComponent } from './student-quiz-play.component';

describe('StudentQuizPlayComponent', () => {
  let component: StudentQuizPlayComponent;
  let fixture: ComponentFixture<StudentQuizPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentQuizPlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentQuizPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
