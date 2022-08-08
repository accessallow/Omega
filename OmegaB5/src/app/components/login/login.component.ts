import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

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

  constructor(private loginService : LoginService, private router: Router){
    if(localStorage.getItem('token')){
      this.router.navigate(['/home']);
    }
  }

  login(){
      this.loginService.login(this.username,this.password).subscribe(response => {
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
