import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHackerspacesComponent } from './admin-hackerspaces.component';

describe('AdminHackerspacesComponent', () => {
  let component: AdminHackerspacesComponent;
  let fixture: ComponentFixture<AdminHackerspacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHackerspacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHackerspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
