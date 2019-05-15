import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { EmployeeComponent } from './employee/employee.component';
import { SalaryComponent } from './salary/salary.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { OrganizationComponent } from './organization/organization.component';
import { CoefficientComponent } from './coefficient/coefficient.component';
import { TemplateComponent } from './shared/salary/template/template.component';
import { TemplateaccountComponent } from './shared/salary/templateaccount/templateaccount.component';
import { AdjustComponent } from './shared/salary/adjust/adjust.component';
import { TemplateEditorComponent } from './shared/forms/template-editor/template-editor.component';
import { SalaryCalculatorComponent } from './shared/salary-calculator/salary-calculator.component';
import { ProfileDetailComponent } from './shared/profile-detail/profile-detail.component';
import { UsergroupsComponent } from './usergroups/usergroups.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/injectable/authguard';
import { PermissionComponent } from './permission/permission.component';
import { AuditComponent } from './audit/audit.component';
import { BackupComponent } from './backup/backup.component';

const routes: Routes = [
  { path: '', redirectTo: '/task', pathMatch: 'full',canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileDetailComponent,canActivate: [AuthGuard] },
  { path: 'employee', component: EmployeeComponent,canActivate: [AuthGuard] },
  { path: 'org', component: OrganizationComponent ,canActivate: [AuthGuard]},
  { path: 'coefficient', component: CoefficientComponent,canActivate: [AuthGuard] },
  { path: 'salary', component: SalaryComponent ,canActivate: [AuthGuard]},
  { path: 'salary/template', component: TemplateComponent,canActivate: [AuthGuard] },
  { path: 'salary/templateaccount', component: TemplateaccountComponent,canActivate: [AuthGuard] },
  { path: 'salary/template/create', component: TemplateEditorComponent,canActivate: [AuthGuard] },
  { path: 'salary/template/update/:id', component: TemplateEditorComponent,canActivate: [AuthGuard] },
  { path: 'salary/template/show/:id', component: TemplateEditorComponent,canActivate: [AuthGuard] },
  { path: 'salary/calculate', component: SalaryCalculatorComponent,canActivate: [AuthGuard] },
  { path: 'salary/adjust', component: AdjustComponent,canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent,canActivate: [AuthGuard] },
  { path: 'admin/usergroups', component: UsergroupsComponent,canActivate: [AuthGuard] },
  { path: 'admin/users', component: UsersComponent,canActivate: [AuthGuard] },
  { path: 'admin/roles', component: RolesComponent,canActivate: [AuthGuard] },
  { path: 'admin/permissions', component: PermissionComponent,canActivate: [AuthGuard] },
  { path: 'admin/backup', component: BackupComponent,canActivate: [AuthGuard] },
  { path: 'task', component: AuditComponent,canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
