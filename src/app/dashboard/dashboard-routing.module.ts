import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongesComponent } from './conges/conges.component';
import { EmployeComponent } from './employe/employe.component';
import { EmployesComponent } from './employes/employes.component';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { MaterialComponent } from './material/material.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OverviewComponent } from './overview/overview.component';
import { PresenceComponent } from './presence/presence.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';
import { StatsComponent } from './stats/stats.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path:'navbar', component:NavBarComponent,
  canActivate: [AuthGuard],
    children:[
      {path:'', redirectTo:'overview', pathMatch:'full'},
     
      {path:'employes', component:EmployesComponent
    },
      {path:'employes/:id', component:EmployeComponent},
      {path:'presence', component:PresenceComponent},
      {path:'events', component:EventsComponent},
   {path:'events/:idf',component:EventComponent},
     
      {path:'overview', component: OverviewComponent},
      {path:'reclamations', component:ReclamationsComponent },
      {path:'conges', component:CongesComponent},
      {path:'material', component:MaterialComponent},
      {path:'stats', component:StatsComponent}
    ], runGuardsAndResolvers: 'always'}
];
export const appRoutingProviders: any[] = [

];
@NgModule({
  imports: [RouterModule.forChild(routes,)],
  exports: [RouterModule, ]
})
export class DashboardRoutingModule { }
