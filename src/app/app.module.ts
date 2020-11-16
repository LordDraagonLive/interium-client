import { ClientCredentials } from './shared/helpers/client-credentials';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
// import {MatInputModule, MatButtonModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';



import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing.module';
import { SigninCallbackComponent } from './signin-callback/signin-callback.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountDetailComponent } from './account-detail/account-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SigninCallbackComponent,
    AccountDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  providers: [ClientCredentials],
  bootstrap: [AppComponent]
})
export class AppModule { }
