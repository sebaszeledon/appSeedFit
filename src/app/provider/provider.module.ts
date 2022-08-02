import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderAllComponent } from './provider-all/provider-all.component';
import { ProviderShowComponent } from './provider-show/provider-show.component';
import { ProviderCreateComponent } from './provider-create/provider-create.component';
import { ProviderUpdateComponent } from './provider-update/provider-update.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProviderAllComponent,
    ProviderShowComponent,
    ProviderCreateComponent,
    ProviderUpdateComponent
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProviderModule { }
