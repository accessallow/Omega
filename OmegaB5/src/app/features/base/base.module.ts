import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SbButtonsComponent } from './sb-buttons/sb-buttons.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './toast/toast.service';
import { ToastsContainer } from './toast/toast.component';
import { StatusPipe } from './status.pipe';
import { BaseComponent } from './base/base.component';
import { FormsModule } from '@angular/forms';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { NoItemsComponent } from './no-items/no-items.component';
import { LoadingStripComponent } from './loading-strip/loading-strip.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SbButtonsComponent,
    ToastsContainer,
    StatusPipe,
    BaseComponent,
    ValidationErrorComponent,
    NoItemsComponent,
    LoadingStripComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    SbButtonsComponent,
    ToastsContainer,
    StatusPipe,
    BaseComponent,
    ValidationErrorComponent,
    NoItemsComponent,
    LoadingStripComponent
  ],
  providers: [
    ToastService
  ]
})
export class BaseModule { }
