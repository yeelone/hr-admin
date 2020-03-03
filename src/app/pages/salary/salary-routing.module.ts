import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalaryComponent } from './salary.component';
import { SalaryCalculatorComponent } from './calculator/salary-calculator.component';
import { TemplateaccountComponent } from './templateaccount/templateaccount.component';
import { TemplateComponent } from './template/template.component';
import { TemplateEditorComponent } from './component/template-editor/template-editor.component';
import { SalaryConfigComponent } from './config/config.component';

const routes: Routes = [
  {path: '', component: SalaryComponent },
  {path: 'calculate', component: SalaryCalculatorComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'templateaccount', component: TemplateaccountComponent },
  { path: 'template/create', component: TemplateEditorComponent },
  { path: 'template/update/:id', component: TemplateEditorComponent},
  { path: 'template/show/:id', component: TemplateEditorComponent },
  { path: 'config', component: SalaryConfigComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryRoutingModule { }
