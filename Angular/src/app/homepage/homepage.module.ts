import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginSiteComponent } from './components/login-site/login-site.component';



@NgModule({
  declarations: [
    DashboardComponent,
    LoginSiteComponent,
  ],
  exports: [
    LoginSiteComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class HomepageModule { }
