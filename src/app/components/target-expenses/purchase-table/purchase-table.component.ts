import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-purchase-table',
  templateUrl: './purchase-table.component.html',
  styleUrls: ['./purchase-table.component.scss']
})
export class PurchaseTableComponent implements OnInit, OnChanges {

  @Input()
  purchases: Purchase[];
  tableDataSource: MatTableDataSource<Purchase>;
  selection: SelectionModel<Purchase>;
  displayedColumns = ['select', 'picture', 'url', 'price'];

  constructor(private _dataService: DataService,
              private changeDetectorRefs: ChangeDetectorRef) {
    this.tableDataSource = new MatTableDataSource<Purchase>();
    this.selection = new SelectionModel<Purchase>(true, []);
  }

  ngOnInit() {
    // subscribing is done in the parent component
    this.tableDataSource.data = this.purchases;
  }

  ngOnChanges() {
    this.refreshTable();
  }

  getTotalPrice() {
    return this.purchases.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.tableDataSource.data.forEach(row => this.selection.select(row));
  }

  removeSelectedItems() {
    const shorterPurchaseList = this.purchases.filter( purchase => {
      return !this.isItemToBeDeleted(purchase);
    });
    this.purchases = shorterPurchaseList;
    this.refreshTable();
  }

  isItemToBeDeleted(purchase: Purchase) {
    for (const item of this.selection.selected) {
      if (item.id === purchase.id) {
        this._dataService.removePurchaseFromLocalStorage(item.id);
        return true;
      }
    }
    return false;
  }
  refreshTable() {
    this.tableDataSource.data = this.purchases;
    this.changeDetectorRefs.detectChanges();
  }

}
