import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from './features/base/toast/toast.service';
import { AppConfigService } from './services/app-config.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'spa-app';
  username:string = '';
  password:string = '';
  healthCheckInterval:any;

  constructor(private loginService : LoginService, private appConfig: AppConfigService){

  }



  ngOnInit(){
      this.healthCheckInterval = setInterval(()=>{
        this.appConfig.healthCheckCall();
      },this.appConfig.healthCheckTimeoutInterval);
  }

  ngOnDestroy(): void {
      clearInterval(this.healthCheckInterval);
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
