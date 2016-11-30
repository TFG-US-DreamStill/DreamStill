import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {MdCardModule} from '@angular2-material/card';
import {MdButtonModule} from '@angular2-material/button';
import {MdIconModule} from '@angular2-material/icon';
import {MdIconRegistry} from '@angular2-material/icon';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }         from './app.component';
import { CalendarComponent }    from './calendar.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroService }          from './hero.service';
import { HeroSearchComponent }  from './hero-search.component';
import { LoginComponent }       from './login.component';
import { PrivateComponent }     from './private.component';
import { FirebaseComponent }    from './firebase.component';
import { MorpheuzReprComponent }from './morpheuzRepr.component';
import { PlotlyComponent }      from './plotly.component';
import { GraphComponent }       from './graph.component';
import { Config }               from './config.service';
import { CalendarModule } from 'angular-calendar';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    BrowserModule, 
    MdCardModule, 
    MdButtonModule, 
    MdIconModule,
    AppRoutingModule,
    CalendarModule.forRoot()
  ],
  declarations: [
    AppComponent,
    CalendarComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    LoginComponent,
    PrivateComponent,
    FirebaseComponent,
    MorpheuzReprComponent,
    PlotlyComponent,
    GraphComponent
  ],
  providers: [ HeroService, MdIconRegistry, Config],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
