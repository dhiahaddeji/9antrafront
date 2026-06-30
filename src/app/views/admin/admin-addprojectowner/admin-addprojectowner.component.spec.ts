import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddprojectownerComponent } from './admin-addprojectowner.component';

describe('AdminAddprojectownerComponent', () => {
  let component: AdminAddprojectownerComponent;
  let fixture: ComponentFixture<AdminAddprojectownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddprojectownerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddprojectownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
