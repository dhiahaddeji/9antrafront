import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGrouprecordsComponent } from './admin-grouprecords.component';

describe('AdminGrouprecordsComponent', () => {
  let component: AdminGrouprecordsComponent;
  let fixture: ComponentFixture<AdminGrouprecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGrouprecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGrouprecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
