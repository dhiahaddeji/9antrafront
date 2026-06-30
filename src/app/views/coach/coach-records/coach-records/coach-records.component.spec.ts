import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachRecordsComponent } from './coach-records.component';

describe('CoachRecordsComponent', () => {
  let component: CoachRecordsComponent;
  let fixture: ComponentFixture<CoachRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
