import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbButtonsComponent } from './sb-buttons.component';

describe('SbButtonsComponent', () => {
  let component: SbButtonsComponent;
  let fixture: ComponentFixture<SbButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SbButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SbButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
