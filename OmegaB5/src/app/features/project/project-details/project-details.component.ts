import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AppContextService } from 'src/app/services/app-context.service';
import { BaseComponent } from '../../base/base/base.component';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent extends BaseComponent implements OnInit {
  project: any = null;
  active = 1;

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
    this.project = this.route.snapshot.paramMap.get('project');
    this.project = JSON.parse(this.project);
    console.log('project = ', this.project);
    if(this.project.releases.length>0){
        this.active = this.project.releases[0].id;
    }
  }

  deleteAndBack() {
    this.projectService.deleteProject(this.project).subscribe(next => {
      console.log("Delete call done!");
      this.appContext.put('flash','Project Deleted');
      console.log("navigate");
      this.router.navigate(['project/all']);
    });
  }

  cancelAndBack() {
    this.router.navigate(['project/all']);
  }

  updateProjectPage(): void {
    this.router.navigate(["/project/update",{projectToUpdate:JSON.stringify(this.project)}]);
  }

}
