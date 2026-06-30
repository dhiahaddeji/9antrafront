import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectownerComponent } from './admin-projectowner.component';

describe('AdminProjectownerComponent', () => {
  let component: AdminProjectownerComponent;
  let fixture: ComponentFixture<AdminProjectownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProjectownerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProjectownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
