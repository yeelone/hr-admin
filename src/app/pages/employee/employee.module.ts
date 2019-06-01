import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomDirectiveModule } from 'src/app/directive/directive.module';

const MODULES = [
  NgZorroAntdModule,
  EmployeeRoutingModule,
  CommonModule,
  SharedModule,
  FormsModule,
  ReactiveFormsModule,
   CustomDirectiveModule,
];

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    ...MODULES,
  ]
})
export class EmployeeModule { }
