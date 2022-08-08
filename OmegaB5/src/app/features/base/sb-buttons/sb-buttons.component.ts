import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'sb-buttons',
  templateUrl: './sb-buttons.component.html',
  styleUrls: ['./sb-buttons.component.css']
})
export class SbButtonsComponent implements OnInit {

  constructor(private _location: Location) { }

  @Output() onSave = new EventEmitter<any>();
  @Output() onBack = new EventEmitter<any>();

  ngOnInit(): void {
  }

  backCall(): void {
    this.onBack.emit();
    this._location.back();
  }

  saveCall(): void {
    this.onSave.emit();
  }


}
