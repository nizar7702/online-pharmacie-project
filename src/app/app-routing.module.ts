import { EditMedComponent } from './edit-med/edit-med.component';
import { MedslistCOMPONENT } from './../medslist/meds-list.component';
import { DetailsMedComponent } from './details-med/details-med.component';
import { ConfigMedComponent } from './../config-med/config-med.component';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { QuizComponent } from './quiz/quiz.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ClientslistComponent } from './clientslist/clientslist.component';
import { ClientcartComponent } from './clientcart/clientcart.component';
import{AuthuserGuard}from'./authuser.guard';
import{AuthadminGuard}from'./authadmin.guard';
import { ContactslistComponent } from './contactslist/contactslist.component';
const routes: Routes = [
  {
    path:"header",
    component:HeaderComponent
  },
  {
    path:"footer",
    component:FooterComponent
  },
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"shop",
    component:ShopComponent,
  },
  {
    path:"quiz",
    component:QuizComponent
  },
  {
    path:"about",
    component:AboutComponent
  },
  {
    path:"cart",
    component:CartComponent,
    canActivate:[AuthuserGuard]
  },
  {
    path:"contact",
    component:ContactComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"clientslist",
    component:ClientslistComponent,
    canActivate:[AuthadminGuard]
  },
  {
    path:"clientcart/:id",
    component:ClientcartComponent,
    canActivate:[AuthadminGuard]
  },
  {
    path:"contactslist",
    component:ContactslistComponent,
    canActivate:[AuthadminGuard]
  },
  {
    path:"add-med",
    component:ConfigMedComponent,
    canActivate:[AuthadminGuard]

  },
  {path:'events/:name',component:DetailsMedComponent,canActivate:[AuthuserGuard]},
  {
    path:"Meds-list",
    component:MedslistCOMPONENT,
    canActivate:[AuthadminGuard]
  },
  {
    path:"edit-med/:name",component:EditMedComponent,
    canActivate:[AuthadminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
