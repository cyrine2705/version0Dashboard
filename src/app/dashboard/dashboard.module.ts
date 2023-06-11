import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { EventComponent } from './event/event.component';
import { StatsComponent } from './stats/stats.component';
import { EventsComponent } from './events/events.component';
import { MaterialRequestComponent } from './material-request/material-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditEventComponent } from './edit-event/edit-event.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


@NgModule({
  declarations: [
    EventComponent,
    StatsComponent,
    EventsComponent,
    MaterialRequestComponent,
    AddEmployeComponent,
    EditEventComponent,
    AdminProfileComponent,
 
  ],
  imports: [
    BrowserModule,
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule ,MatFormFieldModule, 
    NgChartsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy,  },
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
  
  ],
})
export class DashboardModule { }
