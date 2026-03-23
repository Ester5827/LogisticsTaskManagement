import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { VehicleMonitorComponent } from './components/vehicle-monitor/vehicle-monitor.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    VehicleMonitorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
