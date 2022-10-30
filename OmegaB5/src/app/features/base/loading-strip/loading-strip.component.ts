import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loading-strip',
  templateUrl: './loading-strip.component.html',
  styleUrls: ['./loading-strip.component.css']
})
export class LoadingStripComponent implements OnInit {

  @Input('text') text:string = 'Processing data ...';

  constructor() { }

  ngOnInit(): void {
  }

}
