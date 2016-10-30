import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { LoginComponent }       from './login.component';
import { PrivateComponent }     from './private.component';
import { FirebaseComponent }    from './firebase.component';
import { MorpheuzReprComponent }from './morpheuzRepr.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes',     component: HeroesComponent },
  { path: 'login',      component: LoginComponent },
  { path: 'private',    component: PrivateComponent },
  { path: 'firebase',   component: FirebaseComponent },
  { path: 'morpheuz',   component: MorpheuzReprComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
