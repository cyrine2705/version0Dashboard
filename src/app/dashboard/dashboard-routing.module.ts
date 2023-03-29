import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongesComponent } from './conges/conges.component';
import { EmployeComponent } from './employe/employe.component';
import { EmployesComponent } from './employes/employes.component';
import { MaterialComponent } from './material/material.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OverviewComponent } from './overview/overview.component';
import { PresenceComponent } from './presence/presence.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';

const routes: Routes = [
  { path:'navbar', component:NavBarComponent,
   
    children:[
      {path:'', redirectTo:'overview', pathMatch:'full'},
     
      {path:'employes', component:EmployesComponent
    },
      {path:'employes/:idf', component:EmployeComponent},
      {path:'presence', component:PresenceComponent},
      
      {path:'overview', component: OverviewComponent},
      {path:'reclamations', component:ReclamationsComponent },
      {path:'conges', component:CongesComponent},
      {path:'material', component:MaterialComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes,)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
