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
  online: boolean = false;

  constructor(private menuService: MenuService, private appConfig : AppConfigService) {
      this.menu = this.menuService.menu;
      this.appName = this.appConfig.appName;
      document.title = this.appName;
      if(localStorage.getItem("debugMode")){
        this.debugMode = localStorage.getItem("debugMode")=='true';
      }
      if(localStorage.getItem("online")){
        this.online = localStorage.getItem("online")=='true';
      }
  }

  ngOnInit(): void {
    this.appConfig.online.subscribe(rboolean => {
        this.online = rboolean;
    });
  }

  toggleDebugMode(){
    this.appConfig.debugMode.next(this.debugMode);
  }

}
