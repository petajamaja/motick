import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-purchase-table',
  templateUrl: './purchase-table.component.html',
  styleUrls: ['./purchase-table.component.scss']
})
export class PurchaseTableComponent implements OnInit {

  @Input()
  purchases: Purchase[];
  tableDataSource: MatTableDataSource<Purchase>;
  displayedColumns = ['picture', 'url', 'price'];

  constructor() {
    this.tableDataSource = new MatTableDataSource<Purchase>();
  }

  ngOnInit() {
    // subscribing is done in the parent component
    this.tableDataSource.data = this.purchases;
  }

  getTotalPrice() {
    return this.purchases.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }

}
