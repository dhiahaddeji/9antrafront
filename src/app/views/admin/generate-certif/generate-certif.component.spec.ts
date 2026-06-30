import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCertifComponent } from './generate-certif.component';

describe('GenerateCertifComponent', () => {
  let component: GenerateCertifComponent;
  let fixture: ComponentFixture<GenerateCertifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateCertifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateCertifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
