import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

  username:string = '';
  password:string = '';

  constructor(private dataService : DataService, private router: Router){
    if(localStorage.getItem('token')){
      this.router.navigate(['/home']);
    }
  }

  login(){
      this.dataService.login(this.username,this.password).subscribe(response => {
          if(response!='no token found'){
            let validToken = response;
            localStorage.setItem("token",validToken);
            this.router.navigate(['/home']);
          }
      });
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

}
