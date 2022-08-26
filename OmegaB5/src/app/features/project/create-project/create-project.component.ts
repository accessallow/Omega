import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AppContextService } from 'src/app/services/app-context.service';
import { BaseComponent } from '../../base/base/base.component';
import { ToastService } from '../../base/toast/toast.service';
import { ProjectService } from '../services/project.service';


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

  validations:any = {
    project:false,
    start:false,
    end:false,
    status:false,
    pass:true
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
    if(this.validateAll()){
      this.projectService
      .create({
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
          this.toastService.errorMessage(
            'Error',
            'Error in creating project'
          );
        }
      );
    }
  }

  validateAll() : boolean{
      this.validations.project = this.form.name.trim().length == 0;
      this.validations.start = this.form.start.trim().length == 0;
      this.validations.end = this.form.end.trim().length == 0;
      this.validations.status = this.form.status =='Select';

      return !(this.validations.project || this.validations.start || this.validations.end || this.validations.status);
  }

  showInfo(): void {
    console.log(this.form);
  }
}
