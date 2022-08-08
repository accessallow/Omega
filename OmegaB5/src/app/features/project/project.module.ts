import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { DeleteProjectComponent } from './delete-project/delete-project.component';
import { Routes, RouterModule } from '@angular/router';
import { BaseModule } from '../base/base.module';
import { FormsModule } from '@angular/forms';
import { ProjectService } from './service/project.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: 'all', component: ProjectsComponent },
  { path: 'create', component: CreateProjectComponent },
  { path: 'update', component: UpdateProjectComponent },
  { path: 'delete', component: DeleteProjectComponent },
];

@NgModule({
  declarations: [
    ProjectsComponent,
    CreateProjectComponent,
    UpdateProjectComponent,
    DeleteProjectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    BaseModule,
    NgbModule
  ],
  providers: [ProjectService]
})
export class ProjectModule { }
