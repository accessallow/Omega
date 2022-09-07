import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AppContextService } from 'src/app/services/app-context.service';
import { BaseComponent } from '../../base/base/base.component';
import { ToastService } from '../../base/toast/toast.service';
import { ProjectService } from '../../project/services/project.service';

@Component({
  selector: 'app-project-planner',
  templateUrl: './project-planner.component.html',
  styleUrls: ['./project-planner.component.css']
})
export class ProjectPlannerComponent extends BaseComponent implements OnInit {

  constructor(
    private toastService: ToastService,
    private router: Router,
    private appContext: AppContextService,
    private appConfigService: AppConfigService
  ) {
    super(appConfigService);
  }

  ngOnInit(): void {

  }

}
