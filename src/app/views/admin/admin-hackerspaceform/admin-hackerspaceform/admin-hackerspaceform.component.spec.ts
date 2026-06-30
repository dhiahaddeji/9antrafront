import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHackerspaceformComponent } from './admin-hackerspaceform.component';

describe('AdminHackerspaceformComponent', () => {
  let component: AdminHackerspaceformComponent;
  let fixture: ComponentFixture<AdminHackerspaceformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHackerspaceformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHackerspaceformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
