import { Component } from '@angular/core';
import { ToastService } from './features/base/toast/toast.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spa-app';
  username:string = '';
  password:string = '';

  constructor(private loginService : LoginService){

  }

  login(){
      this.loginService.login(this.username,this.password).subscribe(response => {
         if(response!='no token found'){
           let validToken = response;
           localStorage.setItem("token",validToken);
         }
      });
  }

  logout(){
    localStorage.removeItem("token");
  }
}
