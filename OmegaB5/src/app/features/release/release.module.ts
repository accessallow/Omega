import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateReleaseComponent } from './create-release/create-release.component';
import { UpdateReleaseComponent } from './update-release/update-release.component';
import { DeleteReleaseComponent } from './delete-release/delete-release.component';
import { ReleaseDetailsComponent } from './release-details/release-details.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from '../base/base.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReleaseService } from './services/release.service';
import { ReleasesComponent } from './releases/releases.component';

const routes: Routes = [
  { path: 'create', component: CreateReleaseComponent },
  { path: 'update', component: UpdateReleaseComponent },
  { path: 'delete', component: DeleteReleaseComponent },
  { path: 'details', component: ReleaseDetailsComponent },
  { path: 'all', component: ReleasesComponent },
  { path: '**', component: ReleasesComponent }
];

@NgModule({
  declarations: [
    CreateReleaseComponent,
    UpdateReleaseComponent,
    DeleteReleaseComponent,
    ReleaseDetailsComponent,
    ReleasesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BaseModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  providers: [ReleaseService]
})
export class ReleaseModule { }
