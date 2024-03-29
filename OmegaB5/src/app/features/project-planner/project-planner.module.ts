import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectPlannerComponent } from './project-planner/project-planner.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BaseModule } from '../base/base.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectPlannerService } from './services/project-planner.service';


const routes: Routes = [
  { path: 'plan/:id', component: ProjectPlannerComponent },
  { path: '**', component: ProjectPlannerComponent },
];

@NgModule({
  declarations: [
    ProjectPlannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    BaseModule,
    NgbModule
  ],
  providers: [
    ProjectPlannerService
  ]
})
export class ProjectPlannerModule { }
