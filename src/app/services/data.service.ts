import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject } from 'rxjs';
const STORAGE_KEY_PURCHASE = 'local_purchase_list';

/**
 * Storing, editing and deleting the motivational purchases.
 * This service subscribes to browser local storage observable.
 */
@Injectable()
export class DataService {

  private purchases = new BehaviorSubject<any>([]);
  $purchase = this.purchases.asObservable();

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  /**
   * Change state of observable by either adding, modifying or deleting some
   * of the items in it.
   * @param $purchase - observable of purchases with added/deleted data
   */
  changePurchase($purchase) {
    this.purchases.next($purchase);
  }

  /**
   * Add purchase to local storage.
   * @param purchase
   */
  public addPurchaseToLocalStorage(purchase: Purchase): void {
    const currentPurchaseList = this.storage.get(STORAGE_KEY_PURCHASE) || [];
    currentPurchaseList.push({
              id: purchase.id,
              name: purchase.name,
              url: purchase.url,
              pictureUrl: purchase.pictureUrl,
              price: purchase.price
    });
    this.storage.set(STORAGE_KEY_PURCHASE, currentPurchaseList);
    this.changePurchase(currentPurchaseList);
    console.log(this.storage.get(STORAGE_KEY_PURCHASE) || 'LocaL storage is empty');
  }

  public removePurchaseFromLocalStorage(purchaseId: number): void {
    const currentPurchaseList = this.storage.get(STORAGE_KEY_PURCHASE) || [];
    const newPurchaseList = currentPurchaseList.filter((purchase) => {
      return purchase.id !== purchaseId;
    });
    this.storage.remove(STORAGE_KEY_PURCHASE);
    this.storage.set(STORAGE_KEY_PURCHASE, newPurchaseList);
    this.changePurchase(newPurchaseList);
  }

  public getPurchaseListFromLocalStorage(): void {
    this.changePurchase(this.storage.get(STORAGE_KEY_PURCHASE) || []);
  }
}
