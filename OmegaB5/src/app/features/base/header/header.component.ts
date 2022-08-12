import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menu : any[] = [];
  appName : string = 'Test';
  debugMode: boolean = false;

  constructor(private menuService: MenuService, private appConfig : AppConfigService) {
      this.menu = this.menuService.menu;
      this.appName = this.appConfig.appName;
  }

  ngOnInit(): void {
  }

  toggleDebugMode(){
    this.appConfig.debugMode.next(this.debugMode);
  }

}
