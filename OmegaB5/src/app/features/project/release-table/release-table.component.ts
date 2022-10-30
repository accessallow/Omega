import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base/base.component';

@Component({
  selector: 'app-release-table',
  templateUrl: './release-table.component.html'
})
export class ReleaseTableComponent extends BaseComponent implements OnInit {

  @Input('release') release:any;

  constructor() {
    super();
  }

  ngOnInit(): void {

  }

  addNewReleaseEvent(): void {

  }

  addNewSprint(): void {

  }

}
