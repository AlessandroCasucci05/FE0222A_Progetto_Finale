import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './auth-components/signup.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthinterceptorInterceptor } from '../interceptor/authinterceptor.interceptor';

const routes:Routes = [];


@NgModule({
  declarations: [
    SignupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthinterceptorInterceptor,
      multi:true
    }
  ]
})
export class AuthModule { }
