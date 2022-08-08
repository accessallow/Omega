import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CanActivateRouteGuard } from './services/can-activate-route-guard';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: HomeComponent , canActivate: [CanActivateRouteGuard]},
  {
    path: 'project',
    loadChildren: () => import('./features/project/project.module').then(m => m.ProjectModule)
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
