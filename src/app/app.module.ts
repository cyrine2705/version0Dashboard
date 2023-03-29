import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { MaterialComponent } from './dashboard/material/material.component';
import { NavBarComponent } from './dashboard/nav-bar/nav-bar.component';
import { EmployesComponent } from './dashboard/employes/employes.component';
import { ReclamationsComponent } from './dashboard/reclamations/reclamations.component';
import { CongesComponent } from './dashboard/conges/conges.component';
import { PresenceComponent } from './dashboard/presence/presence.component';
import { EmployeComponent } from './dashboard/employe/employe.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { HashLocationStrategy, LocationStrategy, NgOptimizedImage, provideImgixLoader } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OverviewComponent,
    MaterialComponent,
    NavBarComponent,
    EmployesComponent,
    ReclamationsComponent,
    CongesComponent,
    PresenceComponent,
    EmployeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy,  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }