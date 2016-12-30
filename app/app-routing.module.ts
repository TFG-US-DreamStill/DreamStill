import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent }    from './calendar.component';
import { FirebaseComponent }    from './firebase.component';
import { MorpheuzReprComponent }from './morpheuzRepr.component';
import { GraphsComponent }      from './graphs.component';
import { ApisComponent }        from './apis.component';

const routes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: 'calendar',   component: CalendarComponent },
  { path: 'firebase',   component: FirebaseComponent },
  { path: 'morpheuz',   component: MorpheuzReprComponent },
  { path: 'graphs',     component: GraphsComponent },
  { path: 'apis',       component: ApisComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
