import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {QuotesComponent} from '../quotes/quotes.component';
import {QuoteListComponent} from '../quotes/quote-list/quote-list.component';
import {AuthGuardService} from '../shared/auth-guard.service';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'quotes', canActivate: [AuthGuardService], component: QuotesComponent,
    children: [
      {path: 'list', component: QuoteListComponent},
    ]}

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
