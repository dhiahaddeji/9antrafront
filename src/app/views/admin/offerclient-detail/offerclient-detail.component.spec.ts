import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferclientDetailComponent } from './offerclient-detail.component';

describe('OfferclientDetailComponent', () => {
  let component: OfferclientDetailComponent;
  let fixture: ComponentFixture<OfferclientDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferclientDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferclientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
