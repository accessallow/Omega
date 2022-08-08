import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintTileComponent } from './sprint-tile.component';

describe('SprintTileComponent', () => {
  let component: SprintTileComponent;
  let fixture: ComponentFixture<SprintTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
