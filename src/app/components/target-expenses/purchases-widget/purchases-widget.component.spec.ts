import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesWidgetComponent } from './purchases-widget.component';

describe('PurchasesWidgetComponent', () => {
  let component: PurchasesWidgetComponent;
  let fixture: ComponentFixture<PurchasesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
