import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { AppSettings } from '../api/app-settings.interface';

/**
 * A service for making calculations needed to find out
 * how many hours I have to work per day/how far away I 
 * am from my goal.
 */
@Injectable()
export class MoneyTrackService {

  as: AppSettings;
  constructor(private _dataService: DataService) {
    this._dataService.getAppSettingsFromLocalStorage();
    this._dataService.settings$.subscribe( res => {
      this.as = res;
    });
  }

  getGoalAttendance() {
    return this.as.goalAttendancePercent / 100;
  }
  getIncomeBasedOnAttendanceGoal() {
    return this.as.monthlyIncome * this.getGoalAttendance();
  }
  getFoodTicketsAmount() {
    return this.as.foodTickersPerManDay * this.getGoalAttendance() * this.as.workDaysThisMonth;
  }
  getRealFoodSpendings() {
    return this.as.foodSpendings -
          this.as.foodTickersPerManDay * this.as.goalAttendancePercent / 100;
  }

  calculateIncomePerDay() {

  }

}
