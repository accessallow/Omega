import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-release-table',
  templateUrl: './release-table.component.html'
})
export class ReleaseTableComponent implements OnInit {

  @Input('release') release:any;

  constructor() { }

  ngOnInit(): void {

  }

  addNewReleaseEvent(): void {

  }

  addNewSprint(): void {

  }

}
