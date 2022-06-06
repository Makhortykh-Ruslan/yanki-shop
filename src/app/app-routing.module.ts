import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardGuard} from './guards/auth-guard.guard';
import {HomePageComponent} from './modules/client/pages/home-page/home-page.component';
import {ProductsPageComponent} from './modules/client/pages/products-page/products-page.component';
import {ProductPageComponent} from './modules/client/pages/product-page/product-page.component';
import {HomeComponent} from './modules/client/components/home/home.component';
import {ClientPrivateDataPageComponent} from './modules/client/pages/client-private-data-page/client-private-data-page.component';
import {
  ClientPrivateOrdersComponent
} from './modules/client/pages/client-private-orders/client-private-orders.component';
import {
  ClientPrivateDataPrivateComponent
} from './modules/client/pages/client-private-data-private/client-private-data-private.component';
import {CartPageComponent} from './modules/client/pages/cart-page/cart-page.component';
import {CartGuard} from './guards/cart.guard';

const routes: Routes = [
  {path: '', component: HomePageComponent, children: [
      // {path: '', component: HomeComponent},
      // {path: 'products', component: ProductsPageComponent},
      // {path: 'products/:id', component: ProductPageComponent}
    ]},
  {path: 'products', component: ProductsPageComponent},
  {path: 'product/:id', component: ProductPageComponent},
  {path: 'clientAccount', component: ClientPrivateDataPageComponent, children: [
      {path: 'clientOrder', component: ClientPrivateOrdersComponent},
      {path: 'client', component: ClientPrivateDataPrivateComponent}
    ], canActivate: [AuthGuardGuard]},
  {path: 'cart', component: CartPageComponent, canActivate: [CartGuard]}
  // {path: '', loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule)},
  // {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
