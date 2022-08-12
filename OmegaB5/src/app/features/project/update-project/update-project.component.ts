import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppContextService } from 'src/app/services/app-context.service';
import { ToastService } from '../../base/toast/toast.service';
import { ProjectService } from '../service/project.service';
import * as moment from 'moment';
import { BaseComponent } from '../../base/base/base.component';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent extends BaseComponent implements OnInit {
  project: any = null;

  //Form properties
  // form: any = {
  //   id: -1,
  //   name: '',
  //   description: '',
  //   status: '0',
  //   start: '',
  //   end: '',
  // };

  constructor(
    private projectService: ProjectService,
    private toastService: ToastService,
    private router: Router,
    private appContext: AppContextService,
    private route: ActivatedRoute,
    private appConfigService: AppConfigService
  ) {
    super(appConfigService);
  }

  ngOnInit(): void {
    this.project = this.route.snapshot.paramMap.get('projectToUpdate');
    this.project = JSON.parse(this.project);
    this.project.start = this.convertDate(this.project.start);
    this.project.end = this.convertDate(this.project.end);
  }

  convertDate(d1:string){
    let newDate:string = moment(d1, 'DD-MM-YYYY').format('YYYY-MM-DD');
    return newDate;
  }

  getDate(date:string):any{
    return date;
  }

  trailZero(n:number){
    return n<10? '0'+n:n;
  }

  saveProject(): void {

    this.projectService
      .updateProject(this.project)
      .subscribe(
        (response) => {

          this.appContext.put('flash','Project updated = ' + this.project.name);
          this.router.navigate(['project/all']);
        },
        (error) => {
          this.toastService.successMessage(
            'Error',
            'Error in creating project'
          );
        }
      );
  }

}
