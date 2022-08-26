import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { BaseDataService } from "./base-data-service";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService extends BaseDataService{
  public appName:string = 'Omega';
  public debugMode = new Subject<boolean>();
  public online = new Subject<boolean>();
  public healthCheckTimeoutInterval:number = 5000;

  constructor(httpClient: HttpClient){
    super(httpClient);
  }

  healthCheckCall() : void{
    this.httpClient.get(this.baseURL+'/actuator/health').subscribe(r => {
      if(r){
          this.online.next(true);
      }
    }, e => {
          this.online.next(false);
    });
  }
}
