import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuotesComponent } from './quotes/quotes.component';
import { QuoteListComponent } from './quotes/quote-list/quote-list.component';
import { QuoteEditComponent } from './quotes/quote-list/quote-edit/quote-edit.component';
import { HeaderComponent } from './header/header.component';
import {MaterialModule} from './material/material.module';
import {QuotesService} from './shared/quotes.service';
import {RouterModule} from '@angular/router';
import {RoutingModule} from './routing/routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {QuoteDetailComponent} from './quotes/quote-list/quote-detail/quote-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    QuotesComponent,
    QuoteListComponent,
    QuoteEditComponent,
    HeaderComponent,
    QuoteDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    RoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [QuotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
