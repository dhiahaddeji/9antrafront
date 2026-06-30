import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrainingsComponent } from './admin-trainings.component';

describe('AdminTrainingsComponent', () => {
  let component: AdminTrainingsComponent;
  let fixture: ComponentFixture<AdminTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTrainingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
