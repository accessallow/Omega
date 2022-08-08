import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseTileComponent } from './release-tile.component';

describe('ReleaseTileComponent', () => {
  let component: ReleaseTileComponent;
  let fixture: ComponentFixture<ReleaseTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleaseTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
