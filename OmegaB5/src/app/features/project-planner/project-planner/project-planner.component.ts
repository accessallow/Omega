import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { find } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AppContextService } from 'src/app/services/app-context.service';
import { BaseComponent } from '../../base/base/base.component';
import { ToastService } from '../../base/toast/toast.service';
import { ProjectService } from '../../project/services/project.service';

@Component({
  selector: 'app-project-planner',
  templateUrl: './project-planner.component.html',
  styleUrls: ['./project-planner.component.css']
})
export class ProjectPlannerComponent extends BaseComponent implements OnInit {

  projectJson:any = {
      type:'project',
      data:{
        name:"Test Project",
        start:'2022-09-08',
        end:'2022-09-24'
      },
      children:[
        {
          type:'release',
          data:{
            name:"R1",
            start:'2022-09-08',
            end:'2022-09-24'
          },
          children:[
            {
              type:'sprint',
              data:{
                name:"SP1",
                start:'2022-09-08',
                end:'2022-09-24'
              },
              children:[]
            },
            {
              type:'sprint',
              data:{
                name:"SP2",
                start:'2022-09-08',
                end:'2022-09-24'
              },
              children:[]
            },
            {
              type:'event',
              data:{
                name:"Minor Release",
                start:'2022-09-08',
                end:'2022-09-24'
              },
              children:[]
            }
          ]
        },
        {
          type:'release',
          data:{
            name:"R2",
            start:'2022-09-08',
            end:'2022-09-24'
          },
          children:[
            {
              type:'sprint',
              data:{
                name:"SP1",
                start:'2022-09-08',
                end:'2022-09-24'
              },
              children:[]
            },
            {
              type:'sprint',
              data:{
                name:"SP2",
                start:'2022-09-08',
                end:'2022-09-24'
              },
              children:[]
            },
            {
              type:'event',
              data:{
                name:"Minor Release",
                start:'2022-09-08',
            end:'2022-09-24'
              },
              children:[]
            }
          ]
        },{
          type:'event',
          data:{
            name:'Project Launch',
            start:'2022-09-08',
            end:'2022-09-24'
          },
          children:[]
        },
        {
          type:'break',
          data:{
            name:'Summer Break',
            start:'2022-09-08',
            end:'2022-09-24'
          },
          children:[]
        }
      ]
  };

  constructor(
    private toastService: ToastService,
    private router: Router,
    private appContext: AppContextService,
    private appConfigService: AppConfigService
  ) {
    super(appConfigService);
  }

  ngOnInit(): void {
    this.uuid(this.projectJson);
  }

  getUUID(){
    return Date.now()+Math.random();
  }

  uuid(element:any){
    element.uuid = this.getUUID();
    element.children.forEach((child:any) => {
        this.uuid(child);
    });
  }

  unselect(element:any){
    element.data.selected = false;
    this.selectedUUID = null;
    element.children.forEach((child:any) => {
        this.unselect(child);
    });
  }
  selectedUUID:any = null;
  select(a:any){
    let prevState = a.data.selected;
    this.unselect(this.projectJson);
    a.data.selected = !prevState;
    if(a.data.selected) {
      this.selectedUUID = a.uuid;
    }else{
      this.selectedUUID = null;
    }
  }

  // a and b are javascript Date objects
  dateDiffInDays(a:any, b:any) {
    return this.workingDaysBetweenDates(a,b);
  }

  workingDaysBetweenDates(d0:any, d1:any){
    /* Two working days and an sunday (not working day) */
    let holidays = ['2016-05-03', '2016-05-05', '2016-05-07'];
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

  parseDate(input:any) {
      // Transform date from text to date
    let parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  }

  arraymove(arr:any, fromIndex:any, toIndex:any) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  scrollToBottom():void{
    setTimeout(()=>{
      window.scrollTo(0, document.body.scrollHeight);
    },0);
  }

  addInRelease(entityType:string,targetRelease:any,scroll:boolean=false){
    if(!scroll){
      this.unselect(this.projectJson);
    }
    let newItem ={
      type:entityType,
      uuid:this.getUUID(),
      data:{
        name:'',
        start:'',
        end:''
      },
      children:[]
    };
    if(this.selectedUUID){
      this.findAndInsertBelow(this.projectJson.children,this.selectedUUID,newItem);
      scroll = false;
    }else{
      targetRelease.children.push(newItem);
    }

    if(scroll){ this.scrollToBottom();}
  }

  insertDirection:string = "down";

  findAndInsertBelow(arr:any[],uuid:any,toInsert:any){
    arr.forEach((item:any,index:number)=>{
      if(item.uuid == uuid){
        let indexOnInsert = this.insertDirection == "up"? index: index+1;
        arr.splice(indexOnInsert,0,toInsert);
        uuid = -1;
      }else{
        this.findAndInsertBelow(item.children,uuid,toInsert);
      }
    });
  }

  deleteItem(itemObject:any): void{
    let itemUniqueCode = itemObject.uuid;
    console.log("to delete = ",itemUniqueCode);
    this.findAndDelete(this.projectJson.children,itemUniqueCode);
  }

  findAndDelete(arr:any[],uuid:any){
    arr.forEach((item:any,index:number)=>{
      if(item.uuid == uuid){
        arr.splice(index,1);
      }else{
        this.findAndDelete(item.children,uuid);
      }
    });
  }
}
