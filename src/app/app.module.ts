import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TargetExpensesComponent } from './components/target-expenses/target-expenses/target-expenses.component';
import {MatToolbarModule, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule, MatFormFieldModule, 
        MatTooltipModule,
        MatInputModule,
        MatExpansionModule,
        MatRadioModule,
        MatDialogModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { PurchasesDialogComponent } from './components/target-expenses/purchases-dialog/purchases-dialog.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TargetExpensesComponent,
    NavbarComponent,
    SettingsComponent,
    PurchasesDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatRadioModule,
    StorageServiceModule,
    MatDialogModule,
    FormsModule,
  ],
  providers: [DataService],
  entryComponents: [PurchasesDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
