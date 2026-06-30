import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoachprofileComponent } from './admin-coachprofile.component';

describe('AdminCoachprofileComponent', () => {
  let component: AdminCoachprofileComponent;
  let fixture: ComponentFixture<AdminCoachprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCoachprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCoachprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
