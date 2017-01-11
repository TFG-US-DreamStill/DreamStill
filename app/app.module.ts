//import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
//import {MdCardModule} from '@angular2-material/card';
import {MdButtonModule} from '@angular2-material/button';
//import {MdIconModule} from '@angular2-material/icon';
import {MdIconRegistry} from '@angular2-material/icon';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';

import { AppComponent }         from './app.component';
import { CalendarComponent }    from './calendar.component';
import { FirebaseComponent }    from './firebase.component';
import { MorpheuzReprComponent }from './morpheuzRepr.component';
import { PlotlyComponent }      from './plotly.component';
import { GraphsComponent }      from './graphs.component';
import { CalendarModule }       from 'angular-calendar';
import { FirebaseService }      from './firebase.service';
import { ApisComponent }        from './apis.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserModule, 
    //MdCardModule, 
    MdButtonModule, 
    //MdIconModule,
    AppRoutingModule,
    CalendarModule.forRoot()
  ],
  declarations: [
    AppComponent,
    CalendarComponent,
    FirebaseComponent,
    MorpheuzReprComponent,
    PlotlyComponent,
    GraphsComponent,
    ApisComponent
  ],
  providers: [ MdIconRegistry, FirebaseService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
