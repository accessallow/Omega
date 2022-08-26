import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReleaseComponent } from './update-release.component';

describe('UpdateReleaseComponent', () => {
  let component: UpdateReleaseComponent;
  let fixture: ComponentFixture<UpdateReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReleaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
