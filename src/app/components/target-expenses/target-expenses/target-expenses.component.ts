import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material';
import { PurchasesDialogComponent } from '../purchases-dialog/purchases-dialog.component';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-target-expenses',
  templateUrl: './target-expenses.component.html',
  styleUrls: ['./target-expenses.component.scss']
})
export class TargetExpensesComponent implements OnInit {

  purchases = [];
  purchaseCount;

  constructor(private _dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    // get all the purchases from local storage
    this._dataService.getPurchaseListFromLocalStorage();
    this._dataService.$purchase.subscribe(res => {
      this.purchases = res;
      this.purchaseCount = res.length;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PurchasesDialogComponent, {
      data: {},
      panelClass: 'dialog-panel'
    });
    dialogRef.afterClosed().subscribe(res => {
      // this._dataService.addPurchaseToLocalStorage(res);
      this.purchases.push(res);
      this._dataService.addPurchaseToLocalStorage(res);
    });
  }
}
