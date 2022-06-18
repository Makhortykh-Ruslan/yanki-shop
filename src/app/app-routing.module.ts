import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardGuard} from './guards/auth-guard.guard';
import {HomePageComponent} from './modules/client/pages/home-page/home-page.component';
import {ProductsPageComponent} from './modules/client/pages/products-page/products-page.component';
import {ProductPageComponent} from './modules/client/pages/product-page/product-page.component';
import {ClientPrivateDataPageComponent} from './modules/client/pages/client-private-data-page/client-private-data-page.component';
import {
  ClientPrivateOrdersComponent
} from './modules/client/pages/client-private-orders/client-private-orders.component';
import {
  ClientPrivateDataPrivateComponent
} from './modules/client/pages/client-private-data-private/client-private-data-private.component';
import {CartPageComponent} from './modules/client/pages/cart-page/cart-page.component';
import {CartGuard} from './guards/cart.guard';
import {NewsPageComponent} from './modules/client/pages/news-page/news-page.component';
import {AboutPageComponent} from './modules/client/pages/about-page/about-page.component';
import {ContactsPageComponent} from './modules/client/pages/contacts-page/contacts-page.component';
import {
  PaymentAndDeliveryPageComponent
} from './modules/client/pages/payment-and-delivery-page/payment-and-delivery-page.component';
import {PageNotFoundComponent} from './modules/client/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'news', component: NewsPageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'contacts', component: ContactsPageComponent},
  {path: 'products', component: ProductsPageComponent},
  {path: 'paymentAndDelivery', component: PaymentAndDeliveryPageComponent},
  {path: 'product/:id', component: ProductPageComponent},
  {path: 'clientAccount', component: ClientPrivateDataPageComponent, children: [
      {path: 'clientOrder', component: ClientPrivateOrdersComponent},
      {path: 'client', component: ClientPrivateDataPrivateComponent}
    ], canActivate: [AuthGuardGuard]},
  {path: 'cart', component: CartPageComponent, canActivate: [CartGuard]},
  { path: '**', pathMatch: 'full',
    component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
