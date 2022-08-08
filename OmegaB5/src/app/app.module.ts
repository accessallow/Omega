import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginService } from './services/login.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { InterceptorService } from './services/interceptor.service';


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
    NgbModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BaseModule
  ],
  providers: [CanActivateRouteGuard,MenuService,AppConfigService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
   },
   LoginService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
