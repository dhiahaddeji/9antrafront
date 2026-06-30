import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoachlistComponent } from './admin-coachlist.component';

describe('AdminCoachlistComponent', () => {
  let component: AdminCoachlistComponent;
  let fixture: ComponentFixture<AdminCoachlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCoachlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCoachlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
