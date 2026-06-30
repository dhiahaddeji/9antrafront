import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrainingUpdateComponent } from './admin-training-update.component';

describe('AdminTrainingUpdateComponent', () => {
  let component: AdminTrainingUpdateComponent;
  let fixture: ComponentFixture<AdminTrainingUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTrainingUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTrainingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
