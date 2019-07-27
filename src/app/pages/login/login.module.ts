import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LoginComponent } from './login.component';

const MODULES = [
  NgZorroAntdModule,
  LoginRoutingModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  SharedModule,
];


@NgModule({
  declarations: [LoginComponent],
  imports: [
    ...MODULES,
  ]
})
export class LoginModule { }
