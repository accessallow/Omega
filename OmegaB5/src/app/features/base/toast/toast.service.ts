import { Injectable, TemplateRef } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast:any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  successMessage(header:string, message: string){
    this.show(message, { header: header , classname: 'bg-success text-white', iconClass:'bi bi-check-circle'});
  }
  errorMessage(header:string, message: string){
    this.show(message, { header: header , classname: 'bg-danger text-white', iconClass:'bi bi-x-circle'});
  }
  warningMessage(header:string, message: string){
    this.show(message, { header: header , classname: 'bg-warning text-white', iconClass:'bi bi-exclamation-circle'});
  }
  alertMessage(header:string, message: string){
    this.show(message, { header: header , classname: 'bg-primary text-white', iconClass:'bi bi-exclamation-triangle'});
  }
}
