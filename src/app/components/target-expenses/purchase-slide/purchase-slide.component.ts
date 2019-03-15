import { Component, OnInit, Input } from '@angular/core';
import { MoneyTrackService } from 'src/app/services/money-track.service';
import { AttendanceMode } from 'src/app/api/app-settings.interface';

@Component({
  selector: 'app-purchase-slide',
  templateUrl: './purchase-slide.component.html',
  styleUrls: ['./purchase-slide.component.scss']
})
export class PurchaseSlideComponent implements OnInit {

  @Input()
  pictureUrl: string;
  @Input()
  price: number;
  @Input()
  attendanceMode: AttendanceMode;

  priceInManDays: number;

  constructor(private _moneyService: MoneyTrackService) { }

  ngOnInit() {
    this.priceInManDays = this._moneyService.getPriceEquivalentInManDays(this.price);
  }

}
