import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { DataService } from './data.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  constructor(private dataService : DataService, private router : Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    let token = localStorage.getItem("token");
    if(token){
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
