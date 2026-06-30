import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCandidacyComponent } from './detail-candidacy.component';

describe('DetailCandidacyComponent', () => {
  let component: DetailCandidacyComponent;
  let fixture: ComponentFixture<DetailCandidacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCandidacyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCandidacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
