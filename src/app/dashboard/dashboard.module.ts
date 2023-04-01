import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashoardComponent } from './dashoard/dashoard.component';
import { EventComponent } from './event/event.component';
import { StatsComponent } from './stats/stats.component';
import { EventsComponent } from './events/events.component';


@NgModule({
  declarations: [
    DashoardComponent,
    EventComponent,
    StatsComponent,
    EventsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
