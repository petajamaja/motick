import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TargetExpensesComponent } from './components/target-expenses/target-expenses/target-expenses.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TargetExpensesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
