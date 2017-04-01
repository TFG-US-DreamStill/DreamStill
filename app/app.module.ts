//import './rxjs-extensions';

import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { FormsModule }        from '@angular/forms';
import { HttpModule }         from '@angular/http';
import {MdCardModule}         from '@angular2-material/card';
import {MdButtonModule}       from '@angular2-material/button';
import {MdIconModule}         from '@angular2-material/icon';
import {MdIconRegistry}       from '@angular2-material/icon';
import {MdMenuModule}         from '@angular2-material/menu';
import {MdSlideToggleModule}       from "@angular2-material/slide-toggle";
import {OVERLAY_PROVIDERS}    from "@angular2-material/core";

import { AppRoutingModule }   from './app-routing.module';

import { AppComponent }       from './app.component';
import { CalendarComponent }  from './calendar.component';
import { PlotlyComponent }    from './plotly.component';
import { GraphsComponent }    from './graphs.component';
import { CalendarModule }     from 'angular-calendar';
import { FirebaseService }    from './firebase.service';
import { ApisComponent }      from './apis.component';
import { MorpheuzComponent }  from './morpheuz.component';
import { AlertsComponent }    from './alerts.component';
import {CapitalizePipe} from "./capitalize.pipe";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserModule, 
    MdCardModule, 
    MdButtonModule, 
    MdIconModule,
    MdMenuModule,
    MdSlideToggleModule,
    AppRoutingModule,
    CalendarModule.forRoot()
  ],
  declarations: [
    AppComponent,
    CalendarComponent,
    PlotlyComponent,
    GraphsComponent,
    ApisComponent,
    MorpheuzComponent,
    AlertsComponent,
    CapitalizePipe
  ],
  providers: [ MdIconRegistry, OVERLAY_PROVIDERS, FirebaseService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
