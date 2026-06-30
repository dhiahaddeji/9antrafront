import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachStudentsTableComponent } from './coach-students-table.component';

describe('CoachStudentsTableComponent', () => {
  let component: CoachStudentsTableComponent;
  let fixture: ComponentFixture<CoachStudentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachStudentsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachStudentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
