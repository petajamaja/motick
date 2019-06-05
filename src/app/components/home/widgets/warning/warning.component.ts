import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent {

  @Input()
  isAttendanceRegular: boolean;
  @Input()
  revenueLoss: number;
  @Input()
  hoursLoss: number;
  @Input()
  mandayLoss: number;
  @Input()
  hoursTillTheGoal: number;
  @Input()
  remainingManDays: number;

  constructor() { }

}
