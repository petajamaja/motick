import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
