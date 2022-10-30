import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'no-items',
  templateUrl: './no-items.component.html'
})
export class NoItemsComponent implements OnInit {

  @Input('plural') plural:string = 'items';
  @Input('singular') singular:string = "item";

  constructor() { }

  ngOnInit(): void {
  }

}
