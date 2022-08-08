import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  constructor(private loginService : LoginService, private router : Router) {

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
