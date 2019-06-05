import { Component, OnInit} from '@angular/core';
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
  hoursTillTheGoal: number;
  remainingManDays: number;

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
      this.hoursTillTheGoal = this._moneyService.getRemainingAttendance(ExpectedMeasure.hours, this.appState.attendanceMonthTotal);
      this.remainingManDays = this._moneyService.getRemainingAttendance(ExpectedMeasure.manday, this.appState.attendanceMonthTotal);
    });
    this._dataService.getAppSettingsFromLocalStorage();
    this._dataService.settings$.subscribe(res => {
      this.isAttendanceRegular = (res.attendanceMode === AttendanceMode.everyday);
      this.goalAttendancePercent = res.goalAttendancePercent;
    });
  }

  /**
   * Method for the warning widget.
   */
  calculateRevenueLoss() {
    if (this.isAttendanceRegular) {
      // if the attendance mode is everyday, return revenue per day
      return +(this._moneyService.getRevenuePerDay()).toFixed(2);
    } else {
      // if the attendance mode is partial, return lost money based on
      // current attendance percentage
      const realHoursPerDay = this._moneyService.getRemainingHoursPerDay(this.appState.daysPassed, this.appState.attendanceMonthTotal);
      return +(this._moneyService.getRevenuePerHour() * realHoursPerDay).toFixed(2);
    }
  }
  /**
   * Method for the warning widget.
   */
  calculateManDayLoss() {
    if (this.isAttendanceRegular) {
      // if the attendance mode is everyday, return revenue per day
      return 1;
    } else {
      // if the attendance mode is partial, return lost mandays based on
      // current attendance percentage; in this case 1MD = 8 hours
      return this._moneyService.getPriceEquivalentInManDays(this.calculateRevenueLoss());
    }
  }

  /**
   * Add hours worked during the day on the add hours widget.
   */
  saveHours() {
    this.appState.attendanceMonthTotal = this.appState.attendanceMonthTotal += this.hoursToday;
    this.appState.daysPassed += 1;
    this.appState.realAttendancePercent = this._moneyService.getRealAttendance(
      ExpectedMeasure.percentage, this.appState.attendanceMonthTotal
    );
    this._dataService.changeAppState(this.appState);
  }

}
