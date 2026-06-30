import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHackerspacesUpdateComponent } from './admin-hackerspaces-update.component';

describe('AdminHackerspacesUpdateComponent', () => {
  let component: AdminHackerspacesUpdateComponent;
  let fixture: ComponentFixture<AdminHackerspacesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHackerspacesUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHackerspacesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
