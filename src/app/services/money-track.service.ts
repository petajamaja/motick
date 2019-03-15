import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { AppSettings, AttendanceMode } from '../api/app-settings.interface';

export enum ExpectedMeasure {
  // rational number between 0 and 1
  percentage,
  // mandays between 0 and max_month_days
  manday,
  // number between 0 and 100
  number,
  // number of work hours
  hours
}

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

  /**
   * Returns goal attendance in selected measure.
   */
  public getGoalAttendance(mode: ExpectedMeasure) {
    switch (mode) {
      case ExpectedMeasure.percentage:
        return this.as.goalAttendancePercent / 100;
      case ExpectedMeasure.number:
        return this.as.goalAttendancePercent;
      case ExpectedMeasure.manday:
        // mandays always are equal to the number of days
        // in the month, only length of manday varies
        return this.as.workDaysThisMonth;
      case ExpectedMeasure.hours:
        return this.as.workDaysThisMonth * this.getManDayLength();
      default:
        break;
    }
  }

  /**
   * Calculates real attendance.
   * @param totalHours
   */
  public getRealAttendance(mode: ExpectedMeasure, totalHours: number) {
    const manDaysCompleted = totalHours / this.getManDayLength();
    switch (mode) {
      case ExpectedMeasure.percentage:
        return manDaysCompleted / this.as.workDaysThisMonth;
      case ExpectedMeasure.number:
        return manDaysCompleted / this.as.workDaysThisMonth * 100;
      case ExpectedMeasure.manday:
        return manDaysCompleted;
      case ExpectedMeasure.hours:
        return totalHours;
      default:
        break;
    }
  }

  /**
   * Calculates remaining attendance for this month.
   * @param totalHours
   */
  public getRemainingAttendance(mode: ExpectedMeasure, totalHours: number) {
    return this.getGoalAttendance(mode) - this.getRealAttendance(mode, totalHours);
  }

  /**
   * Gets total income including food tickets.
   */
  public getTotalIncomeWithFood() {
    return this.as.monthlyIncome + this.getFoodTicketsAmount();
  }
  /**
   * Gets total income uncluding food per day.
   */
  public getTotalIncomePerDay() {
    return this.getTotalIncomeWithFood() / this.as.workDaysThisMonth;
  }

  /**
   * Gets income based on planned attendance.
   */
  public getRealIncome() {
    return this.as.monthlyIncome * this.getGoalAttendance(ExpectedMeasure.percentage);
  }

  /**
   * Gets the money equivalent of expected food tickets this month.
   */
  public getFoodTicketsAmount() {
    return this.as.foodTickersPerManDay * this.getGoalAttendance(ExpectedMeasure.percentage) * this.as.workDaysThisMonth;
  }

  /**
   * Calculates the food spendings after all the food tickets are used.
   */
  public getRealFoodSpendings() {
    return this.as.foodSpendings - this.getFoodTicketsAmount();
  }

  /**
   * Calculates money equivalent of monthly revenue.
   */
  public getRevenuePerMonth() {
    return this.getRealIncome() - this.getRealFoodSpendings() - this.as.rentSpendings;
  }

  /**
   * Calculate revenuer per day given current settings.
   */
  public getRevenuePerDay() {
    return this.getRevenuePerMonth() / this.as.workDaysThisMonth;
  }

  public getRevenuePerHour() {
    return this.getRevenuePerDay() / 8;
  }

  /**
   * Calculates price of an item in mandays, rounded to 2 decimal points
   * @param price - price of a purchase
   */
  public getPriceEquivalentInManDays(price: number) {
    return +(price / this.getRevenuePerDay()).toFixed(2);
  }

  /**
   * Calculates the real amount of hours the user needs to spend
   * at work every PHYSICAL workday.
   * @param dayNum - number of working day in the month
   * @param totalHours - total number of hours worked this month
   */
  getRemainingHoursPerDay(dayNum: number, totalHours: number) {
    const remainingDays = this.as.workDaysThisMonth - dayNum;
    const mandaysPerDay = this.getRemainingAttendance(ExpectedMeasure.manday, totalHours) / remainingDays;
    return mandaysPerDay * this.getManDayLength();
  }

  /**
   * Calculates the manday length according to goal attendance
   */
  public getManDayLength() {
    return this.getGoalAttendance(ExpectedMeasure.percentage) * 8;
  }
}
