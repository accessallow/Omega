import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  public appName:string = 'Omega';
  public debugMode = new Subject<boolean>();
}
