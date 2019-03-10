import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-purchases-widget',
  templateUrl: './purchases-widget.component.html',
  styleUrls: ['./purchases-widget.component.scss']
})
export class PurchasesWidgetComponent implements OnInit {

  purchases: Purchase[];

  constructor(private _dataService : DataService) { }

  ngOnInit() {
    // get all the purchases from local storage
    this._dataService.getPurchaseListFromLocalStorage();
    this._dataService.purchase$.subscribe(res => {
      this.purchases = res;
    });
  }

}
