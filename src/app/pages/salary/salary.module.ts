import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryRoutingModule } from './salary-routing.module';
import { SalaryComponent } from './salary.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDirectiveModule } from 'src/app/directive/directive.module';
import { SalaryCalculatorComponent } from './calculator/salary-calculator.component';
import { TemplateComponent } from './template/template.component';
import { TemplateaccountComponent } from './templateaccount/templateaccount.component';
import { SortablejsModule } from 'angular-sortablejs';
import { BuildinfuncSelectorComponent } from './component/buildinfunc-selector/buildinfunc-selector.component';
import { CoefficientSelectorComponent } from './component/coefficient-selector/coefficient-selector.component';
import { FormulaInputComponent } from './component/formula-input/formula-input.component';
import { TemplateFieldsSelectorComponent } from './component/template-fields-selector/template-fields-selector.component';
import { TemplateFieldMultiSelectorComponent } from './component/template-field-multi-selector/template-field-multi-selector.component';
import { TemplateEditorComponent } from './component/template-editor/template-editor.component';
import { SalaryConfigComponent } from './config/config.component';

const COMPONENTS = [
  SalaryComponent,
  TemplateComponent,
  TemplateaccountComponent,
  SalaryCalculatorComponent,
  BuildinfuncSelectorComponent,
  CoefficientSelectorComponent,
  FormulaInputComponent,
  TemplateFieldsSelectorComponent,
  TemplateFieldMultiSelectorComponent,
  TemplateEditorComponent,
  SalaryConfigComponent
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
  declarations: [...COMPONENTS],
  imports: [
    ...MODULES,
  ]
})
export class SalaryModule { }
