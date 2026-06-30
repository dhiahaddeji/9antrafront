import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectClientComponent } from './admin-project-client.component';

describe('AdminProjectClientComponent', () => {
  let component: AdminProjectClientComponent;
  let fixture: ComponentFixture<AdminProjectClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProjectClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProjectClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
