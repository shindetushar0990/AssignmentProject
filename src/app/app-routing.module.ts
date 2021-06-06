import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrderComponent } from './component/create-order/create-order.component';
import { ViewOrderComponent } from './component/view-order/view-order.component';

const routes: Routes = [
  { path: 'create', component: CreateOrderComponent },
  { path: 'view', component: ViewOrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
