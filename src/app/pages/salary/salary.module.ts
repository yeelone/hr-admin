import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryRoutingModule } from './salary-routing.module';
import { SalaryComponent } from './salary.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDirectiveModule } from 'src/app/directive/directive.module';

const MODULES = [
  NgZorroAntdModule,
  SalaryRoutingModule,
  CommonModule,
  SharedModule,
  FormsModule,
  ReactiveFormsModule,
   CustomDirectiveModule,
];


@NgModule({
  declarations: [SalaryComponent],
  imports: [
    ...MODULES,
  ]
})
export class SalaryModule { }
