import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupcalendarComponent } from './admin-groupcalendar.component';

describe('AdminGroupcalendarComponent', () => {
  let component: AdminGroupcalendarComponent;
  let fixture: ComponentFixture<AdminGroupcalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupcalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGroupcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
