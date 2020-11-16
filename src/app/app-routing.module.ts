import { NgModule } from '@angular/core';
import { RouterModule, Routes, ɵEmptyOutletComponent } from '@angular/router';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SigninCallbackComponent } from './signin-callback/signin-callback.component';


const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },
  { path: 'signin-callback', component: SigninCallbackComponent },
  { path: 'accountDetails/:id', component: AccountDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
