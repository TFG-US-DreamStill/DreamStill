import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent }    from './calendar.component';
import { LoginComponent }       from './login.component';
import { PrivateComponent }     from './private.component';
import { FirebaseComponent }    from './firebase.component';
import { MorpheuzReprComponent }from './morpheuzRepr.component';
import { GraphComponent }       from './graph.component';
import { GraphsComponent }       from './graphs.component';

const routes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: 'calendar',   component: CalendarComponent },
  { path: 'login',      component: LoginComponent },
  { path: 'private',    component: PrivateComponent },
  { path: 'firebase',   component: FirebaseComponent },
  { path: 'morpheuz',   component: MorpheuzReprComponent },
  { path: 'graph',      component: GraphComponent },
  { path: 'graphs',      component: GraphsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
