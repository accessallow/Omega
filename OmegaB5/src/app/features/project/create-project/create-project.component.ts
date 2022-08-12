import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AppContextService } from 'src/app/services/app-context.service';
import { BaseComponent } from '../../base/base/base.component';
import { ToastService } from '../../base/toast/toast.service';
import { ProjectService } from '../service/project.service';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent extends BaseComponent implements OnInit {
  //Form properties
  form: any = {
    id: -1,
    name: '',
    description: '',
    status: '0',
    start: '',
    end: '',
  };

  constructor(
    private projectService: ProjectService,
    private toastService: ToastService,
    private router: Router,
    private appContext: AppContextService,
    private appConfigService: AppConfigService
  ) {
    super(appConfigService);
  }

  ngOnInit(): void {
    //HELLO
  }

  getDate(date:string):any{
    return date;
    // let d = new Date(date);
    // return this.trailZero(d.getDate())+"-"+this.trailZero(d.getMonth()+1)+"-"+d.getFullYear();
  }

  trailZero(n:number){
    return n<10? '0'+n:n;
  }

  saveProject(): void {

    this.projectService
      .createProject({
        name: this.form.name,
        description: this.form.description,
        status: this.form.status,
        start: this.getDate(this.form.start),
        end: this.getDate(this.form.end)
      })
      .subscribe(
        (response) => {

          this.appContext.put('flash','Project created = ' + this.form.name);
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
