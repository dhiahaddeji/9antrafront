import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferclientComponent } from './offerclient.component';

describe('OfferclientComponent', () => {
  let component: OfferclientComponent;
  let fixture: ComponentFixture<OfferclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
