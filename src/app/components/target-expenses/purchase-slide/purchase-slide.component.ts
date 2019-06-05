import { Component, Input } from '@angular/core';
import { AttendanceMode } from 'src/app/api/app-settings.interface';

@Component({
  selector: 'app-purchase-slide',
  templateUrl: './purchase-slide.component.html',
  styleUrls: ['./purchase-slide.component.scss']
})
export class PurchaseSlideComponent {

  @Input()
  pictureUrl: string;
  @Input()
  price: number;
  @Input()
  priceInManDays: number;
  @Input()
  attendanceMode: AttendanceMode;
  constructor() {}
}
