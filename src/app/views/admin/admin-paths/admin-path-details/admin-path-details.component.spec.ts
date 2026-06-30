import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPathDetailsComponent } from './admin-path-details.component';

describe('AdminPathDetailsComponent', () => {
  let component: AdminPathDetailsComponent;
  let fixture: ComponentFixture<AdminPathDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPathDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPathDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
