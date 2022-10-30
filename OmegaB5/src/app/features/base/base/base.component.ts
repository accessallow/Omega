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

  protected appOffline(): void{
    //app is offline
  }
  protected appOnline(): void{
    //app is online
  }

  constructor(private appConfig?: AppConfigService) {
      this.appConfig?.debugMode.subscribe(val => {
        this.debugMode = val;
        localStorage.setItem("debugMode",""+val);
      });
      if(localStorage.getItem("debugMode")){
        this.debugMode = localStorage.getItem("debugMode")=='true';
      }

      this.appConfig?.online.subscribe(val => {
        if(this.online==false && val==true){
          this.appOnline();
        }else if(this.online==true && val==false){
          this.appOffline();
        }
        this.online = val;
        localStorage.setItem("online",""+val);

      });

      if(localStorage.getItem("online")){
        this.online = localStorage.getItem("online")=='true';
      }

  }

  /*
      UTILITY METHODS
  */
      public workingDaysBetweenDates(d0:any, d1:any){
        /* Two working days and an sunday (not working day) */
        let holidays:string[] = [];
        let startDate:any = this.parseDate(d0);
        let endDate:any = this.parseDate(d1);

      // Validate input
        if (endDate <= startDate) {
          return 0;
        }

      // Calculate days between dates
        let millisecondsPerDay = 86400 * 1000; // Day in milliseconds
        startDate.setHours(0, 0, 0, 1);  // Start just after midnight
        endDate.setHours(23, 59, 59, 999);  // End just before midnight
        let diff = endDate - startDate;  // Milliseconds between datetime objects
        let days = Math.ceil(diff / millisecondsPerDay);

        // Subtract two weekend days for every week in between
        let weeks = Math.floor(days / 7);
        days -= weeks * 2;

        // Handle special cases
        let startDay = startDate.getDay();
        let endDay = endDate.getDay();

        // Remove weekend not previously removed.
        if (startDay - endDay > 1) {
          days -= 2;
        }
        // Remove start day if span starts on Sunday but ends before Saturday
        if (startDay == 0 && endDay != 6) {
          days--;
        }
        // Remove end day if span ends on Saturday but starts after Sunday
        if (endDay == 6 && startDay != 0) {
          days--;
        }
        /* Here is the code */
        holidays.forEach(day => {
          if ((day >= d0) && (day <= d1)) {
            /* If it is not saturday (6) or sunday (0), substract it */
            if ((this.parseDate(day).getDay() % 6) != 0) {
              days--;
            }
          }
        });
        return days;
      }

      public parseDate(input:any) {
          // Transform date from text to date
        let parts = input.match(/(\d+)/g);
        // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[2], parts[1]-1, parts[0]); // months are 0-based
      }

}
