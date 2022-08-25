import { Component } from "@angular/core";
import { AppConfigService } from "src/app/services/app-config.service";

@Component({
  selector: 'app-base',
  template: ``
})
export class BaseComponent{
  public debugMode:boolean = false;
  public online: boolean = true;
  public loading : boolean = false;

  constructor(private appConfig: AppConfigService) {
      this.appConfig.debugMode.subscribe(val => {
        this.debugMode = val;
        localStorage.setItem("debugMode",""+val);
      });
      if(localStorage.getItem("debugMode")){
        this.debugMode = localStorage.getItem("debugMode")=='true';
      }

      this.appConfig.online.subscribe(val => {
        this.online = val;
        localStorage.setItem("online",""+val);
      });
      if(localStorage.getItem("online")){
        this.online = localStorage.getItem("online")=='true';
      }

  }

}
