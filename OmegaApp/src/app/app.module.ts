import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CanActivateRouteGuard } from './services/can-activate-route-guard';
import { LogoutComponent } from './components/logout/logout.component';
import { MenuService } from './services/menu.service';
import { AppConfigService } from './services/app-config.service';
import { BaseModule } from './features/base/base.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BaseModule
  ],
  providers: [DataService, CanActivateRouteGuard,MenuService,AppConfigService],
  bootstrap: [AppComponent],
})
export class AppModule { }
