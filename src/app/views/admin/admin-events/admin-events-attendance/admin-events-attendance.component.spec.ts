import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventsAttendanceComponent } from './admin-events-attendance.component';

describe('AdminEventsAttendanceComponent', () => {
  let component: AdminEventsAttendanceComponent;
  let fixture: ComponentFixture<AdminEventsAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEventsAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEventsAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
