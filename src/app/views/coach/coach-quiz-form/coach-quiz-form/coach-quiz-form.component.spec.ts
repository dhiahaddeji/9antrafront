import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachQuizFormComponent } from './coach-quiz-form.component';

describe('CoachQuizFormComponent', () => {
  let component: CoachQuizFormComponent;
  let fixture: ComponentFixture<CoachQuizFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachQuizFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachQuizFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
