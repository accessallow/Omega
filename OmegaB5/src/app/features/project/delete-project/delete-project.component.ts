import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AppContextService } from 'src/app/services/app-context.service';
import { BaseComponent } from '../../base/base/base.component';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css'],
})
export class DeleteProjectComponent extends BaseComponent implements OnInit {
  project: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appContext: AppContextService,
    private projectService: ProjectService,
    private appConfigService: AppConfigService
  ) {
    super(appConfigService);
  }

  ngOnInit(): void {
    //  this.project = this.appContext.read('projectToDelete');
    //  console.log("project = ",this.project);
    //  if(!this.project){
    //   this.router.navigate(['/project/all']);
    //  }
    this.project = this.route.snapshot.paramMap.get('projectToDelete');
    this.project = JSON.parse(this.project);
    console.log('project = ', this.project);
  }

  deleteAndBack() {
    this.projectService.delete(this.project.id).subscribe(next => {
      this.appContext.put('flash','Project Deleted : '+this.project.name);
      this.router.navigate(['project/all']);
    });
  }

  cancelAndBack() {
    this.router.navigate(['project/all']);
  }
}
