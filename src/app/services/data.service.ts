import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject } from 'rxjs';
import { AttendanceMode , AppSettings} from '../api/app-settings.interface';
const STORAGE_KEY_PURCHASE = 'local_purchase_list';
const STORAGE_KEY_SETTINGS = 'local_settings';
const STORAGE_KEY_STATE = 'local_state';


/**
 * Storing, editing and deleting the motivational purchases.
 * This service subscribes to browser local storage observable.
 */
@Injectable()
export class DataService {

  private purchases = new BehaviorSubject<Purchase[]>([]);
  private defaultAppSettings = {
    monthlyIncome: 0,
    foodTickersPerManDay: 0,
    rentSpendings: 0,
    foodSpendings: 0,
    goalAttendancePercent: 100,
    attendanceMode: AttendanceMode.everyday,
    workDaysThisMonth: 0
  };
  private appSettings = new BehaviorSubject<AppSettings>(this.defaultAppSettings);
  private defaultAppState = {
    realAttendancePercent: 0,
    attendanceToday: 0,
    attendanceMonthTotal: 0,
    daysPassed: 0
  };
  private appState = new BehaviorSubject<AppState>(this.defaultAppState);

  purchase$ = this.purchases.asObservable();
  settings$ = this.appSettings.asObservable();
  state$ = this.appState.asObservable();

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  /**
   * Change state of observable by either adding, modifying or deleting some
   * of the items in it.
   * @param purchase$ - observable of purchases with added/deleted data
   */
  public changePurchase(purchase$) {
    this.purchases.next(purchase$);
  }

  /**
   * Change the settings to a new state.
   * @param newSettings - new object implementing AppSettings interface
   */
  public changeAppSettings(newSettings$: AppSettings) {
    this.appSettings.next(newSettings$);
    this.storage.remove(STORAGE_KEY_SETTINGS);
    this.storage.set(STORAGE_KEY_SETTINGS, newSettings$);
  }

  /**
   * Change the state to a new state.
   * @param newState$ - new object implementing AppState interface
   */
  public changeAppState(newState$: AppState) {
    this.appState.next(newState$);
    this.storage.remove(STORAGE_KEY_STATE);
    this.storage.set(STORAGE_KEY_STATE, newState$);
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
              url: purchase
              .url,
              pictureUrl: purchase.pictureUrl,
              price: purchase.price
    });
    this.storage.set(STORAGE_KEY_PURCHASE, currentPurchaseList);
    this.changePurchase(currentPurchaseList);
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

  public getAppSettingsFromLocalStorage(): void {
    // set the default app settings in case there are none yet
    this.changeAppSettings(this.storage.get(STORAGE_KEY_SETTINGS) || this.defaultAppSettings);
  }

  public getAppStateFromLocalStorage(): void {
    // set the default app state in case today there has been no changes
    this.changeAppState(this.storage.get(STORAGE_KEY_STATE) || this.defaultAppState);
  }
}
