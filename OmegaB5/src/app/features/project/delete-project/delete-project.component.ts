import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppContextService } from 'src/app/services/app-context.service';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css'],
})
export class DeleteProjectComponent implements OnInit {
  project: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appContext: AppContextService,
    private projectService: ProjectService
  ) {}

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
}
