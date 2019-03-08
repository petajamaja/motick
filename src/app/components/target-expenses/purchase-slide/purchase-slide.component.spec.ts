import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSlideComponent } from './purchase-slide.component';

describe('PurchaseSlideComponent', () => {
  let component: PurchaseSlideComponent;
  let fixture: ComponentFixture<PurchaseSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
