import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderAllComponent } from './provider-all/provider-all.component';
import { ProviderCreateComponent } from './provider-create/provider-create.component';
import { ProviderShowComponent } from './provider-show/provider-show.component';
import { ProviderUpdateComponent } from './provider-update/provider-update.component';

const routes: Routes = [
  { path: 'proveedor', component: ProviderAllComponent },
  { path: 'proveedor/create', component: ProviderCreateComponent },
  { path: 'proveedor/:id', component: ProviderShowComponent },
  { path: 'proveedor/update/:id', component: ProviderUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
