import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtPickerComponent } from './court-picker.component';

describe('CourtPickerComponent', () => {
  let component: CourtPickerComponent;
  let fixture: ComponentFixture<CourtPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
