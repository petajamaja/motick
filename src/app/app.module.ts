import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TargetExpensesComponent } from './components/target-expenses/target-expenses/target-expenses.component';
import {MatToolbarModule, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule, MatFormFieldModule, 
        MatTooltipModule,
        MatInputModule,
        MatExpansionModule,
        MatRadioModule,
        MatDialogModule,
        MatTableModule,
        MatCheckboxModule} from '@angular/material';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { PurchasesDialogComponent } from './components/target-expenses/purchases-dialog/purchases-dialog.component';
import { DataService } from './services/data.service';
import { PurchaseTableComponent } from './components/target-expenses/purchase-table/purchase-table.component';
import { PurchasesWidgetComponent } from './components/target-expenses/purchases-widget/purchases-widget.component';
import { PurchaseSlideComponent } from './components/target-expenses/purchase-slide/purchase-slide.component';
import { MoneyTrackService } from './services/money-track.service';
import { RevenueComponent } from './components/home/widgets/revenue/revenue.component';
import { WarningComponent } from './components/home/widgets/warning/warning.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TargetExpensesComponent,
    NavbarComponent,
    SettingsComponent,
    PurchasesDialogComponent,
    PurchaseTableComponent,
    PurchasesWidgetComponent,
    PurchaseSlideComponent,
    RevenueComponent,
    WarningComponent,
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
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatCarouselModule
  ],
  providers: [DataService, MoneyTrackService],
  entryComponents: [PurchasesDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
