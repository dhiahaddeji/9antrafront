import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrainingsformComponent } from './admin-trainingsform.component';

describe('AdminTrainingsformComponent', () => {
  let component: AdminTrainingsformComponent;
  let fixture: ComponentFixture<AdminTrainingsformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTrainingsformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTrainingsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
