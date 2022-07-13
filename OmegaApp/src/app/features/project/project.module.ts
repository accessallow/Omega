import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { DeleteProjectComponent } from './delete-project/delete-project.component';
import { Routes, RouterModule } from '@angular/router';
import { BaseModule } from '../base/base.module';

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
    BaseModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjectModule { }
