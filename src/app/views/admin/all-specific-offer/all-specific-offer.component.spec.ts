import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSpecificOfferComponent } from './all-specific-offer.component';

describe('AllSpecificOfferComponent', () => {
  let component: AllSpecificOfferComponent;
  let fixture: ComponentFixture<AllSpecificOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSpecificOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSpecificOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
