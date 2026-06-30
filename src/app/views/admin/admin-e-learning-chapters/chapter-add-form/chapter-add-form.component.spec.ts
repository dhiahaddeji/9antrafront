import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterAddFormComponent } from './chapter-add-form.component';

describe('ChapterAddFormComponent', () => {
  let component: ChapterAddFormComponent;
  let fixture: ComponentFixture<ChapterAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
