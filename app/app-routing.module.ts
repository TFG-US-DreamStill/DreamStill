import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent }    from './calendar.component';
import { GraphsComponent }      from './graphs.component';
import { ApisComponent }        from './apis.component';

const routes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: 'calendar',   component: CalendarComponent },
  { path: 'graphs',     component: GraphsComponent },
  { path: 'apis',       component: ApisComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
