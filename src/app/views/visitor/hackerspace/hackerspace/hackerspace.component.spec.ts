import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackerspaceComponent } from './hackerspace.component';

describe('HackerspaceComponent', () => {
  let component: HackerspaceComponent;
  let fixture: ComponentFixture<HackerspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HackerspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HackerspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
