import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { find } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AppContextService } from 'src/app/services/app-context.service';
import { BaseComponent } from '../../base/base/base.component';
import { ToastService } from '../../base/toast/toast.service';
import { ProjectService } from '../../project/services/project.service';
import { ProjectPlannerService } from '../services/project-planner.service';

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
  projectId:any;

  constructor(
    private toastService: ToastService,
    private router: Router,
    private appContext: AppContextService,
    private appConfigService: AppConfigService,
    private projectPlannerService: ProjectPlannerService,
    private activatedRoute: ActivatedRoute
  ) {
    super(appConfigService);
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    if(id){
      this.projectPlannerService.getProjectStructure(id).subscribe(ps => {
        this.projectJson = ps;
        this.projectId = id;
      });
    }
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

  public override parseDate(input:any) {
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

  validateProjectJson(){
    let validateResult:boolean = true;
    let validate = function(node:any){
      //Validate node's attribute
      if(node && node.data){
        if(node.type=='release'){
          if(node.data?.name.trim()==''){
            validateResult = false;
            node.error = {};
            node.error.message = "Insuffcient Data";
          }
        }
        if(['sprint','event','break'].includes(node.type)){
          if(node.data?.name.trim()=='' || node.data?.start.trim()=='' || node.data?.end.trim()==''){
            validateResult = false;
            node.error = {};
            node.error.message = "Insuffcient Data";
          }
        }

      }
      //If node has children, validate their attributes
      if(node.children && node.children.length>0){
        node.children.forEach((ch:any) => {
          validate(ch);
        });
      }
    }
    validate(this.projectJson);
    console.log("Overall validation result = ",validateResult);
    return validateResult;
  }

  addDatesToReleases(){
      this.projectJson.children.forEach((ch:any)=>{
          if(ch.type == 'release'){
            if(ch.children.length>0){
              let first = ch.children[0];
              let last = ch.children[ch.children.length-1];
              ch.data['start'] = first.data.start;
              ch.data['end'] = last.data.end;
            }
          }
      });
  }

  submitPayload() : void {
    this.validateProjectJson();
    this.addDatesToReleases();
    console.log("payload",this.projectJson);
    this.loading = true;
    if(this.projectId){
      this.updateProject();
    }else{
      this.createProject();
    }
  }

  createProject(){
    this.projectPlannerService.planProject(this.projectJson).subscribe(
      (response) => {
        this.loading = false;
        this.appContext.put('flash','Project created = ' + this.projectJson.data.name);
        this.router.navigate(['project/all']);
      },
      (error) => {
        this.loading = false;
        this.toastService.errorMessage(
          'Error',
          'Error in creating project'
        );
      }
    );
  }

  updateProject() : void {
    this.projectPlannerService.updateProjectPlan(this.projectId,this.projectJson).subscribe(
      (response) => {
        this.loading = false;
        this.appContext.put('flash','Project updated = ' + this.projectJson.data.name);
        this.router.navigate(['project/all']);
      },
      (error) => {
        this.loading = false;
        this.toastService.errorMessage(
          'Error',
          'Error in updating project'
        );
      }
    );
  }

}
