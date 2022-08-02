import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAllComponent } from './product-all/product-all.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductIndexComponent } from './product-index/product-index.component';
import { ProductShowComponent } from './product-show/product-show.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

const routes: Routes = [
  { path: 'producto', component: ProductIndexComponent },
  { path: 'producto/all', component: ProductAllComponent },
  { path: 'producto/create', component: ProductCreateComponent },
  { path: 'producto/:id', component: ProductShowComponent },
  { path: 'producto/update/:id', component: ProductUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
