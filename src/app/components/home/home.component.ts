import { Component, OnInit } from '@angular/core';
import { MoneyTrackService } from 'src/app/services/money-track.service';
import { DataService } from 'src/app/services/data.service';
import { AttendanceMode } from 'src/app/api/app-settings.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  appState: AppState;
  revenuePerMonth: number;
  incomePerMonth: number;
  revenuePerDay: number;
  incomePerHour: number;
  hoursToday: number;
  isAttendanceRegular: boolean;

  constructor(private _dataService: DataService,
              private _moneyService: MoneyTrackService) { }

  ngOnInit() {
    this.revenuePerMonth = +(this._moneyService.getRevenuePerMonth()).toFixed(2);
    this.revenuePerDay = +(this._moneyService.getRevenuePerDay()).toFixed(2);
    this.incomePerMonth = +(this._moneyService.getTotalIncomeWithFood()).toFixed(2);
    this.incomePerHour = +(this._moneyService.getTotalIncomePerDay() / 8).toFixed(2);
    this._dataService.getAppStateFromLocalStorage();
    this._dataService.state$.subscribe(res => {
      this.appState = res;
    });
    this._dataService.settings$.subscribe(res => {
      this.isAttendanceRegular = (res.attendanceMode === AttendanceMode.everyday);
      console.log(res.attendanceMode);
      console.log(AttendanceMode.everyday);
      console.log(res.attendanceMode === AttendanceMode.everyday);
    });
  }

  saveHours() {
    this.appState.attendanceToday = this.hoursToday;
    // add hours to the total of this month
    this.appState.attendanceMonthTotal = this.appState.attendanceMonthTotal += this.hoursToday;
    this.appState.realAttendancePercent = this._moneyService.getRealAttendance(this.appState.attendanceMonthTotal);
    this._dataService.changeAppState(this.appState);
  }
}

