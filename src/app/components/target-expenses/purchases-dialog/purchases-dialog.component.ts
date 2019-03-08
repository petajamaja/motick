import { Component, HostListener, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CloseReason, DialogResult, KEY_CODE } from '../../shared/dialog/dialog-result';

@Component({
  selector: 'app-purchases-dialog',
  templateUrl: './purchases-dialog.component.html',
  styleUrls: ['./purchases-dialog.component.scss']
})
export class PurchasesDialogComponent implements OnInit {

  purchaseForm: FormGroup;
  newPurchase: Purchase;

  constructor(
    public dialogRef: MatDialogRef<PurchasesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Purchase,
    private formBuilder: FormBuilder) {
      this.initialize(data);
    }

  ngOnInit() {
    this.purchaseForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      url: ['', [Validators.required]],
      pictureUrl: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
  }

  initialize(data: Purchase) {
    this.newPurchase = data;
  }

  /* Make dialog closeable with Esc key */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ESC) {
      this.closeDialog(null);
    }
  }

  closeDialog(reason = CloseReason.CANCEL) {
    this.dialogRef.close(new DialogResult<Purchase>(reason, null));
  }

  saveDialog(reason = CloseReason.SUCCESS) {
    this.dialogRef.close(new DialogResult<Purchase>(reason,  this.purchaseForm.value));
  }
}
