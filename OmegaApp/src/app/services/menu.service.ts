import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menu : any  = [
    {
      title:'Actions',
      icon :'bi bi-gear',
      children: [
        {
          title: 'Register',
          routerLink: '/register',
          icon: 'bi bi-plus-circle-dotted'
        },
        {
          title: 'Home',
          routerLink: '/home',
          icon: 'bi bi-house-door'
        },
        {
          title: 'Logout',
          routerLink: '/logout',
          icon:'bi bi-power'
        }
      ]
    }
  ];
}
