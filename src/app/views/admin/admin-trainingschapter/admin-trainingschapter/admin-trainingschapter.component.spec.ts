import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrainingschapterComponent } from './admin-trainingschapter.component';

describe('AdminTrainingschapterComponent', () => {
  let component: AdminTrainingschapterComponent;
  let fixture: ComponentFixture<AdminTrainingschapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTrainingschapterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTrainingschapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
