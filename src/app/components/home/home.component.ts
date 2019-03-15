import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AttendanceMode, AppSettings } from 'src/app/api/app-settings.interface';
import { MoneyTrackService, ExpectedMeasure } from 'src/app/services/money-track.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  appState: AppState;
  appSettings: AppSettings;
  purchases: Purchase[];
  revenuePerMonth: number;
  incomePerMonth: number;
  revenuePerDay: number;
  hoursInAManDay: number;
  incomePerHour: number;
  hoursToday: number;
  isAttendanceRegular: boolean;
  goalAttendancePercent: number;

  constructor(private _dataService: DataService,
              private _moneyService: MoneyTrackService) { }

  ngOnInit() {
    this.revenuePerMonth = +(this._moneyService.getRevenuePerMonth()).toFixed(2);
    this.revenuePerDay = +(this._moneyService.getRevenuePerDay()).toFixed(2);
    this.incomePerMonth = +(this._moneyService.getTotalIncomeWithFood()).toFixed(2);
    this.incomePerHour = +(this._moneyService.getTotalIncomePerDay() / 8).toFixed(2);
    this.hoursInAManDay = this._moneyService.getManDayLength();

    // get all the purchases from local storage
    this._dataService.getPurchaseListFromLocalStorage();
    this._dataService.purchase$.subscribe(res => {
      this.purchases = res;
    });

    this._dataService.getAppStateFromLocalStorage();
    this._dataService.state$.subscribe(res => {
      this.appState = res;
    });
    this._dataService.getAppSettingsFromLocalStorage();
    this._dataService.settings$.subscribe(res => {
      this.isAttendanceRegular = (res.attendanceMode === AttendanceMode.everyday);
      this.goalAttendancePercent = res.goalAttendancePercent;
    });
  }
}
