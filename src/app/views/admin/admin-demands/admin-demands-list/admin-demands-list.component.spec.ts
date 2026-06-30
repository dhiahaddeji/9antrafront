import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDemandsListComponent } from './admin-demands-list.component';

describe('AdminDemandsListComponent', () => {
  let component: AdminDemandsListComponent;
  let fixture: ComponentFixture<AdminDemandsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDemandsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDemandsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
