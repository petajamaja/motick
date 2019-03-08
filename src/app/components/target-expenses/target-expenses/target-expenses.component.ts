import { Component, OnInit, ViewChild} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material';
import { PurchasesDialogComponent } from '../purchases-dialog/purchases-dialog.component';
import { CloseReason, DialogResult } from '../../shared/dialog/dialog-result';

@Component({
  selector: 'app-target-expenses',
  templateUrl: './target-expenses.component.html',
  styleUrls: ['./target-expenses.component.scss'],
})
export class TargetExpensesComponent implements OnInit {

  purchases = [];

  constructor(private _dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    // get all the purchases from local storage
    this._dataService.getPurchaseListFromLocalStorage();
    this._dataService.$purchase.subscribe(res => {
      this.purchases = res;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PurchasesDialogComponent, {
      data: {} as Purchase,
      panelClass: 'dialog-panel'
    });
    dialogRef.afterClosed().subscribe((res: DialogResult<Purchase>) => {
      if (res && res.reason === CloseReason.SUCCESS) {
        this._dataService.addPurchaseToLocalStorage(res.data);
      }
    });
  }
}
