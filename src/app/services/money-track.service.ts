import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { AppSettings } from '../api/app-settings.interface';
import { ThrowStmt } from '@angular/compiler';

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
   * Turns percentage into the rational number form.
   */
  public getGoalAttendance() {
    return this.as.goalAttendancePercent / 100;
  }
  /**
   * Gets income based on planned attendance.
   */
  public getRealIncome() {
    return this.as.monthlyIncome * this.getGoalAttendance();
  }

  /**
   * Gets total income including food tickets.
   */
  public getTotalIncomeWithFood() {
    return this.as.monthlyIncome + this.getFoodTicketsAmount();
  }

  /**
   * Gets the money equivalent of expected food tickets this month.
   */
  public getFoodTicketsAmount() {
    return this.as.foodTickersPerManDay * this.getGoalAttendance() * this.as.workDaysThisMonth;
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

  public getTotalIncomePerDay() {
    return this.getTotalIncomeWithFood() / this.as.workDaysThisMonth;
  }

  /**
   * Calculates price of an item in mandays, rounded to 2 decimal points
   * @param price - price of a purchase
   */
  public getPriceEquivalentInManDays(price: number) {
    return +(price / this.getRevenuePerDay()).toFixed(2);
  }

  /**
   * Convert desired percentage of attendance into mandays.
   */
  public getManDaysExpectedByGoal() {
    return this.as.goalAttendancePercent * this.as.workDaysThisMonth;
  }

  /**
   * Calculate real attendance based on completed hours of work
   * @param hours
   */
  public getRealAttendance(hours: number) {
    const manDaysCompleted = hours / 8;
    return manDaysCompleted / this.getManDaysExpectedByGoal();
  }

}
