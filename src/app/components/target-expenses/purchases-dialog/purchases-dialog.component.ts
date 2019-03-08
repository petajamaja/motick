import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-purchases-dialog',
  templateUrl: './purchases-dialog.component.html',
  styleUrls: ['./purchases-dialog.component.scss']
})
export class PurchasesDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PurchasesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Purchase) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
