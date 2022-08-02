import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionIndexComponent } from './transaction-index/transaction-index.component';
import { TransactionAllComponent } from './transaction-all/transaction-all.component';
import { TransactionShowComponent } from './transaction-show/transaction-show.component';

const routes: Routes = [
  { path: 'orden', component: TransactionIndexComponent },
  { path: 'transaccion', component: TransactionAllComponent },
  { path: 'transaccion/:id', component: TransactionShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
