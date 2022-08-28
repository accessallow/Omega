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
    },
    {
      title:'Projects',
      icon :'bi bi-kanban',
      children: [
        {
          title: 'All',
          routerLink: '/project/all',
          icon: 'bi bi-list-ul'
        },
        {
          title: 'Create',
          routerLink: '/project/create',
          icon: 'bi bi-folder-plus'
        }
      ]
    },
    {
      title:'Releases',
      icon :'bi bi-truck',
      children: [
        {
          title: 'All',
          routerLink: '/release/all',
          icon: 'bi bi-list-ul'
        },
        {
          title: 'Create',
          routerLink: '/release/create',
          icon: 'bi bi-folder-plus'
        }
      ]
    },
    {
      title:'Sprints',
      icon :'bi bi-balloon',
      children: [
        {
          title: 'All',
          routerLink: '/sprint/all',
          icon: 'bi bi-list-ul'
        },
        {
          title: 'Create',
          routerLink: '/sprint/create',
          icon: 'bi bi-folder-plus'
        }
      ]
    },
    {
      title:'Events',
      icon :'bi bi-lightning-charge',
      children: [
        {
          title: 'All',
          routerLink: '/event/all',
          icon: 'bi bi-list-ul'
        },
        {
          title: 'Create',
          routerLink: '/event/create',
          icon: 'bi bi-folder-plus'
        }
      ]
    }
  ];
}
