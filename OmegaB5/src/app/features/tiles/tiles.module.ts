import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleaseTileComponent } from './release-tile/release-tile.component';
import { SprintTileComponent } from './sprint-tile/sprint-tile.component';
import { EventTileComponent } from './event-tile/event-tile.component';



@NgModule({
  declarations: [
    ReleaseTileComponent,
    SprintTileComponent,
    EventTileComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReleaseTileComponent,
    SprintTileComponent,
    EventTileComponent
  ]
})
export class TilesModule { }
