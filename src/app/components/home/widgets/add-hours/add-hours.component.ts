import { Component, OnInit, Input } from '@angular/core';
import { MoneyTrackService, ExpectedMeasure } from 'src/app/services/money-track.service';
import { DataService } from 'src/app/services/data.service';
import { AttendanceMode } from 'src/app/api/app-settings.interface';

@Component({
  selector: 'app-add-hours',
  templateUrl: './add-hours.component.html',
  styleUrls: ['./add-hours.component.scss']
})
export class AddHoursComponent implements OnInit {

  appState: AppState;
  hoursToday: number;
  hoursToCompensate: number;
  dayNumber: number;
  mandaysRemaining: number;
  isAttendanceRegular: boolean;

  constructor(private _dataService: DataService,
              private _moneyService: MoneyTrackService) { }

  ngOnInit() {
    this._dataService.getAppStateFromLocalStorage();
    this._dataService.state$.subscribe(res => {
      this.appState = res;
      this.dayNumber = res.daysPassed + 1;
    });
    this._dataService.settings$.subscribe(res => {
      this.isAttendanceRegular = (res.attendanceMode === AttendanceMode.everyday);
    });

  }

  saveHours() {
    this.appState.attendanceToday = this.hoursToday;
    // add hours to the total of this month
    this.appState.attendanceMonthTotal = this.appState.attendanceMonthTotal += this.hoursToday;
    this.appState.daysPassed += 1;
    this.appState.realAttendancePercent = this._moneyService.getRealAttendance(
      ExpectedMeasure.percentage, this.appState.attendanceMonthTotal
    );
    this._dataService.changeAppState(this.appState);
  }
}
