import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorage = new BehaviorSubject<any>([]);
  $storageChangesObservable = this.localStorage.asObservable();

  constructor() { }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.localStorage.next('changed');
  }

  removeItem(key) {
    localStorage.removeItem(key);
    this.localStorage.next('changed');
  }
}
