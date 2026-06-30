import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcertifcatesComponent } from './getcertifcates.component';

describe('GetcertifcatesComponent', () => {
  let component: GetcertifcatesComponent;
  let fixture: ComponentFixture<GetcertifcatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetcertifcatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetcertifcatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
