import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()

export class DataService {

  private purchases = new BehaviorSubject<any>([]);
  purchase = this.purchases.asObservable();

  constructor() { }

  changePurchase(purchase) {
    this.purchases.next(purchase);
  }

  getPurchaseCount() {
    return this.purchase;
  }

  saveDataToBrowserStorage() {
    
  }
}
