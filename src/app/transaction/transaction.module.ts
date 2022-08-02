import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionAllComponent } from './transaction-all/transaction-all.component';
import { TransactionShowComponent } from './transaction-show/transaction-show.component';
import { TransactionIndexComponent } from './transaction-index/transaction-index.component';



@NgModule({
  declarations: [
    TransactionAllComponent,
    TransactionShowComponent,
    TransactionIndexComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TransactionRoutingModule
  ]
})
export class TransactionModule { }
