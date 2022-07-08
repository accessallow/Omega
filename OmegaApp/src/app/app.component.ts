import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spa-app';
  username:string = '';
  password:string = '';

  constructor(private dataService : DataService){

  }

  login(){
      this.dataService.login(this.username,this.password).subscribe(response => {
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
