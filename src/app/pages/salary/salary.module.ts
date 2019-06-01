import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryRoutingModule } from './salary-routing.module';
import { SalaryComponent } from './salary.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDirectiveModule } from 'src/app/directive/directive.module';
import { SalaryCalculatorComponent } from './calculator/salary-calculator.component';
import { AdjustComponent } from './adjust/adjust.component';
import { TemplateComponent } from './template/template.component';
import { TemplateaccountComponent } from './templateaccount/templateaccount.component';
import { SortablejsModule } from 'angular-sortablejs';

const COMPONENTS = [
  SalaryComponent,
  TemplateComponent,
  AdjustComponent,
  TemplateaccountComponent,
  SalaryCalculatorComponent,
];

const MODULES = [
  NgZorroAntdModule,
  SalaryRoutingModule,
  CommonModule,
  SharedModule,
  FormsModule,
  ReactiveFormsModule,
   CustomDirectiveModule,
    SortablejsModule,
];

@NgModule({
  declarations: [...COMPONENTS,],
  imports: [
    ...MODULES,
  ]
})
export class SalaryModule { }
