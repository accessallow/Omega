import {Component, TemplateRef} from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"

      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>
          <div class="d-flex">
          <i class="{{toast.iconClass}}"></i>
          &nbsp;
          {{ toast.textOrTpl }}

          <button type="button"
          class="btn-close btn-close-white me-2 m-auto"
          style="color:white;"
          data-bs-dismiss="toast"
          aria-label="Close"></button>

      </div>

      </ng-template>

    </ngb-toast>
  `,
  host: {'class': 'toast-container position-fixed top-0 end-0 p-3', 'style': 'z-index: 1200'}
})
export class ToastsContainer {
  constructor(public toastService: ToastService) {}

  isTemplate(toast:any) { return toast.textOrTpl instanceof TemplateRef; }
}
