import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthService} from './services/auth.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { PreloaderComponent } from './components/preloader/preloader.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ProductPageComponent} from './modules/client/pages/product-page/product-page.component';
import {HomePageComponent} from './modules/client/pages/home-page/home-page.component';
import {NavigationPanelComponent} from './modules/client/components/navigation-panel/navigation-panel.component';
import {FooterComponent} from './modules/client/components/footer/footer.component';
import {ProductsPageComponent} from './modules/client/pages/products-page/products-page.component';
import {LogInComponent} from './modules/client/_shara/log-in/log-in.component';
import {AuthorizationComponent} from './modules/client/_shara/log-in/authorization/authorization.component';
import {RegistrationComponent} from './modules/client/_shara/log-in/registration/registration.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeComponent } from './modules/client/components/home/home.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { CardProductComponent } from './modules/client/components/card-product/card-product.component';
import { MailingListComponent } from './modules/client/components/mailing-list/mailing-list.component';
import {MatButtonModule} from '@angular/material/button';
import { ChangeAndReturnPageComponent } from './modules/client/pages/change-and-return-page/change-and-return-page.component';
import { InfoAboutPageComponent } from './modules/client/pages/info-about-page/info-about-page.component';
import { ClientPrivateDataPageComponent } from './modules/client/pages/client-private-data-page/client-private-data-page.component';
import { CategorisComponent } from './modules/client/components/categoris/categoris.component';
import { FilterComponent } from './modules/client/components/filter/filter.component';
import { PaginatorComponent } from './modules/client/components/paginator/paginator.component';
import { CategoriesPipe } from './pipe/categories.pipe';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import { HumburgerMenuComponent } from './components/humburger-menu/humburger-menu.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {AuthInterceptor} from './Interceptor/auth-interceptor';
import {ProductsService} from './services/products.service';
import {NotificationsService} from './services/notifications.service';
import { ClientPrivateOrdersComponent } from './modules/client/pages/client-private-orders/client-private-orders.component';
import { ClientPrivateDataPrivateComponent } from './modules/client/pages/client-private-data-private/client-private-data-private.component';
import {PreloaderInterceptor} from './Interceptor/preloader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    AlertComponent,
    ProductPageComponent,
    HomePageComponent,
    NavigationPanelComponent,
    FooterComponent,
    ProductsPageComponent,
    LogInComponent,
    AuthorizationComponent,
    RegistrationComponent,
    CarouselComponent,
    HomeComponent,
    CardProductComponent,
    MailingListComponent,
    ChangeAndReturnPageComponent,
    InfoAboutPageComponent,
    ClientPrivateDataPageComponent,
    CategorisComponent,
    FilterComponent,
    PaginatorComponent,
    CategoriesPipe,
    HumburgerMenuComponent,
    ClientPrivateOrdersComponent,
    ClientPrivateDataPrivateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule,
    MatRadioModule
  ],
  providers: [
      AuthService,
    NotificationsService,
    ProductsService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: PreloaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
