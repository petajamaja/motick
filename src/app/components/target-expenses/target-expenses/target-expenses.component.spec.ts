import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetExpensesComponent } from './target-expenses.component';

describe('TargetExpensesComponent', () => {
  let component: TargetExpensesComponent;
  let fixture: ComponentFixture<TargetExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
