import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TargetExpensesComponent } from './components/target-expenses/target-expenses/target-expenses.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'expenses',
    component: TargetExpensesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
