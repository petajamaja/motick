import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AppSettings } from '../../api/app-settings.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  appSettings = {} as AppSettings;
  appSettingsForm: FormGroup;
  incomeSettings: FormGroup;
  regularExpenses: FormGroup;
  timeGoals: FormGroup;

  constructor(private _dataService: DataService,
              private _formBuilder: FormBuilder) {}

  ngOnInit() {
    // load current app settings from local storage
    this._dataService.getAppSettingsFromLocalStorage();
    this._dataService.settings$.subscribe(res => {
      this.appSettings = res;
      this.loadFormGroup();
    });

  }

  loadFormGroup() {
    // load it all into the form and create a FormGroup
    this.appSettingsForm = this._formBuilder.group({
      monthlyIncome: [this.appSettings.monthlyIncome, [Validators.required]],
      foodTickersPerManDay: [this.appSettings.foodTickersPerManDay, [Validators.required]],
      rentSpendings: [this.appSettings.rentSpendings, [Validators.required]],
      foodSpendings: [this.appSettings.foodSpendings, [Validators.required]],
      goalAttendancePercent: [this.appSettings.goalAttendancePercent, [Validators.required]],
      attendanceMode: [this.appSettings.attendanceMode, [Validators.required]],
      workDaysThisMonth: [this.appSettings.workDaysThisMonth, [Validators.required]]
    });
  }

  saveSettings() {
    this.appSettings = this.appSettingsForm.value;
    this._dataService.changeAppSettings(this.appSettings);
  }
}
