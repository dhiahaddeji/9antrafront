import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachQuizComponent } from './coach-quiz.component';

describe('CoachQuizComponent', () => {
  let component: CoachQuizComponent;
  let fixture: ComponentFixture<CoachQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
