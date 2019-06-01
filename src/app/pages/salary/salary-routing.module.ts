import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalaryComponent } from './salary.component';
import { SalaryCalculatorComponent } from './calculator/salary-calculator.component';
import { AdjustComponent } from './adjust/adjust.component';
import { TemplateEditorComponent } from 'src/app/shared/forms/template-editor/template-editor.component';
import { TemplateaccountComponent } from './templateaccount/templateaccount.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  {path: '', component: SalaryComponent },
  {path: 'calculate', component: SalaryCalculatorComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'templateaccount', component: TemplateaccountComponent },
  { path: 'template/create', component: TemplateEditorComponent },
  { path: 'template/update/:id', component: TemplateEditorComponent},
  { path: 'template/show/:id', component: TemplateEditorComponent },
  { path: 'adjust', component: AdjustComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryRoutingModule { }
