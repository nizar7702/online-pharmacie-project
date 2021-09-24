import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditMedComponent } from './edit-med/edit-med.component';
import { DetailsMedComponent } from './details-med/details-med.component';
import { MedslistCOMPONENT } from './medslist/meds-list.component';
import { ConfigMedComponent } from './config-med/config-med.component';
import { ProductsService } from './products.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { QuizComponent } from './quiz/quiz.component';
import { ShopComponent } from './shop/shop.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {FormsModule,ReactiveFormsModule}from'@angular/forms';
import{HttpClientModule}from'@angular/common/http';
import { ClientslistComponent } from './clientslist/clientslist.component';
import { ClientcartComponent } from './clientcart/clientcart.component';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { ContactslistComponent } from './contactslist/contactslist.component';
import { FlexLayoutModule,FlexModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
    ContactComponent,
    QuizComponent,
    ShopComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    ClientslistComponent,
    ClientcartComponent,
    ContactslistComponent,
    ConfigMedComponent,
    MedslistCOMPONENT,
    DetailsMedComponent,
    EditMedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastNoAnimationModule.forRoot(),
    FlexLayoutModule,
    FlexModule,
    NgbModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
