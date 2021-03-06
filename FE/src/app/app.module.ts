import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from '../services/users/user.service';
import { AddressService } from '../services/address/address.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UsersComponent } from './users/users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { AddressComponent } from './address/address.component';
import { ValidateComponent } from './validate/validate.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDetailComponent,
    PagenotfoundComponent,
    UsersComponent,
    HeaderComponent,
    ContactComponent,
    SidebarComponent,
    HomeComponent,
    AddressComponent,
    ValidateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    UserService,
    AddressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
