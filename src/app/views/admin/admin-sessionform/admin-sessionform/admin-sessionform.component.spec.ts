import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSessionformComponent } from './admin-sessionform.component';

describe('AdminSessionformComponent', () => {
  let component: AdminSessionformComponent;
  let fixture: ComponentFixture<AdminSessionformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSessionformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSessionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
