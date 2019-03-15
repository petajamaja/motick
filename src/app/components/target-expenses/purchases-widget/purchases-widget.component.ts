import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AttendanceMode } from 'src/app/api/app-settings.interface';

@Component({
  selector: 'app-purchases-widget',
  templateUrl: './purchases-widget.component.html',
  styleUrls: ['./purchases-widget.component.scss']
})
export class PurchasesWidgetComponent implements OnInit {

  purchases: Purchase[];
  attendanceMode: AttendanceMode;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    // get all the purchases from local storage
    this._dataService.getPurchaseListFromLocalStorage();
    this._dataService.purchase$.subscribe(res => {
      this.purchases = res;
    });
    this._dataService.getAppSettingsFromLocalStorage();
    this._dataService.settings$.subscribe(res => {
      this.attendanceMode = res.attendanceMode;
    });
  }
}
