import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SbButtonsComponent } from './sb-buttons/sb-buttons.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './toast/toast.service';
import { ToastsContainer } from './toast/toast.component';
import { StatusPipe } from './status.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    SbButtonsComponent,
    ToastsContainer,
    StatusPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    HeaderComponent,
    SbButtonsComponent,
    ToastsContainer,
    StatusPipe
  ],
  providers: [
    ToastService
  ]
})
export class BaseModule { }
