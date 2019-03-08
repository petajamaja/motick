import { Component, OnInit, Input } from '@angular/core';
import { PurchasesDialogComponent } from '../purchases-dialog/purchases-dialog.component';

@Component({
  selector: 'app-purchase-table',
  templateUrl: './purchase-table.component.html',
  styleUrls: ['./purchase-table.component.scss']
})
export class PurchaseTableComponent implements OnInit {

  @Input()
  purchases: Purchase[];

  constructor() { }

  ngOnInit() {
  }

}
