import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupmembersComponent } from './admin-groupmembers.component';

describe('AdminGroupmembersComponent', () => {
  let component: AdminGroupmembersComponent;
  let fixture: ComponentFixture<AdminGroupmembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupmembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGroupmembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
