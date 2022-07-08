import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StudentComponent } from './components/student/student.component';
import { SubjectComponent } from './components/subject/subject.component';
import { ExamComponent } from './components/exam/exam.component';
import { ReportComponent } from './components/report/report.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CanActivateRouteGuard } from './services/can-activate-route-guard';
import { LogoutComponent } from './components/logout/logout.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuService } from './services/menu.service';
import { AppConfigService } from './services/app-config.service';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    SubjectComponent,
    ExamComponent,
    ReportComponent,
    RegistrationComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LogoutComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [DataService, CanActivateRouteGuard,MenuService,AppConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
