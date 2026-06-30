import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllprojectclientsComponent } from './admin-allprojectclients.component';

describe('AdminAllprojectclientsComponent', () => {
  let component: AdminAllprojectclientsComponent;
  let fixture: ComponentFixture<AdminAllprojectclientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllprojectclientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllprojectclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
