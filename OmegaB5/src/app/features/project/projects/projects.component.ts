import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbCalendar, NgbDate, NgbDatepicker, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AppContextService } from 'src/app/services/app-context.service';
import { BaseComponent } from '../../base/base/base.component';
import { ToastService } from '../../base/toast/toast.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent extends BaseComponent implements OnInit {
  projects:any[] = [];

  constructor(
    private projectService: ProjectService,
    private modalService: NgbModal,
    private calender: NgbCalendar,
    private router: Router,
    private appContext: AppContextService,
    private toastService: ToastService,
    private appConfigService: AppConfigService
    ) {
      super(appConfigService);
    }

  ngOnInit(): void {
    this.loadProjects();

    if(this.appContext.has('flash')){
      let flashMessage = this.appContext.read('flash');
      this.appContext.clear('flash');
      this.toastService.successMessage('Project',flashMessage);
    }
  }

  loadProjects(): void{
    this.loading = true;
    this.projectService.getAll().subscribe((projects)=>{
      this.projects = projects;
      this.projects.forEach(p => {
        switch(p.status){
          case 'PLANNED': p.badgeClass='secondary'; break;
          case 'ONGOING': p.badgeClass='primary'; break;
          case 'COMPLETED': p.badgeClass='success'; break;
        }
      });
      this.loading = false;
    });
  }

  closeResult = '';
  selectedRelease:any =  null;
  open(content:any, release:any) {
    this.selectedRelease = release;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  selectedDate:string = '';
  model: NgbDateStruct = this.calender.getToday();

  @ViewChild('calender') dp!:NgbDatepicker;

  openCalender(content:any, selectedDate:string) {
  return;
    this.selectedDate = selectedDate;
    let dateParts = selectedDate.split('-');

    this.model = {
        "year": parseInt(dateParts[2]),
        "month": parseInt(dateParts[1]),
        "day": parseInt(dateParts[0])
    };

    console.log("model = ",this.model);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'sm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deleteProjectPage(projectId:number): void {
    let projectToDelete = this.projects.filter(f => f.id == projectId)[0];
    //this.appContext.put('projectToDelete',projectToDelete);
    this.router.navigate(["/project/delete",{projectToDelete:JSON.stringify(projectToDelete)}]);
  }

  updateProjectPage(projectId:number): void {
    let projectToUpdate = this.projects.filter(f => f.id == projectId)[0];
    this.router.navigate(["/project/update",{projectToUpdate:JSON.stringify(projectToUpdate)}]);
  }

  projectDetailsPage(projectId:number): void {
    let project = this.projects.filter(f => f.id == projectId)[0];
    this.router.navigate(["/project/details",{project:JSON.stringify(project)}]);
  }

  public override appOnline(): void {
    this.loadProjects();
  }

  public override appOffline(): void {
    
  }

}
