import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MoneyTrackService, ExpectedMeasure } from 'src/app/services/money-track.service';
import { AttendanceMode } from 'src/app/api/app-settings.interface';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {

  @Input()
  appState: AppState;
  @Input()
  isAttendanceRegular: boolean;
  @Input()
  goalAttendancePercent: number;

  revenueLoss: number;
  hoursLoss: number;
  // when full attendance, always = 1
  // when partial attendance, calculated via actual attendance
  mandayLoss: number;
  hoursInAManDay: number;
  hoursTillTheGoal: number;
  remainingManDays: number;

  constructor(private _moneyService: MoneyTrackService) { }

  ngOnInit() {
    this.hoursInAManDay = this._moneyService.getManDayLength();
    this.hoursTillTheGoal = this._moneyService.getRemainingAttendance(ExpectedMeasure.hours, this.appState.attendanceMonthTotal);
    this.remainingManDays = this._moneyService.getRemainingAttendance(ExpectedMeasure.manday, this.appState.attendanceMonthTotal);
    this.revenueLoss = this.calculateRevenueLoss();
    this.mandayLoss = this.calculateManDayLoss();
    this.hoursLoss = this.hoursInAManDay;
  }

  calculateRevenueLoss() {
    if (this.isAttendanceRegular) {
      // if the attendance mode is everyday, return revenue per day
      return this._moneyService.getRevenuePerDay();
    } else {
      // if the attendance mode is partial, return lost money based on
      // current attendance percentage
      const realHoursPerDay = this._moneyService.getRemainingHoursPerDay(this.appState.daysPassed, this.appState.attendanceMonthTotal);
      return this._moneyService.getRevenuePerHour() * realHoursPerDay;
    }
  }

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

}
