import { Component } from "@angular/core";
import { AppConfigService } from "src/app/services/app-config.service";

@Component({
  selector: 'app-base',
  template: ``
})
export class BaseComponent{
  public debugMode:boolean = false;

  constructor(private appConfig: AppConfigService) {
      this.appConfig.debugMode.subscribe(val => this.debugMode = val);
  }

}
