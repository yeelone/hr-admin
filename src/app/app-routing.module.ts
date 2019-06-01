import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './statistics/statistics.component';
import { ProfileDetailComponent } from './shared/profile-detail/profile-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/injectable/authguard';
import { AuditComponent } from './audit/audit.component';

const routes: Routes = [
  { path: '', redirectTo: '/task', pathMatch: 'full',canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileDetailComponent,canActivate: [AuthGuard] },
   { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
  { path: 'employee',  loadChildren: './pages/employee/employee.module#EmployeeModule',canActivate: [AuthGuard] },
  { path: 'org', loadChildren: './pages/organization/organization.module#OrganizationModule', canActivate: [AuthGuard]},
  { path: 'tags', loadChildren: './pages/tags/tags.module#TagsModule',canActivate: [AuthGuard] },
  { path: 'salary', loadChildren: './pages/salary/salary.module#SalaryModule',canActivate: [AuthGuard]},
  { path: 'manager', loadChildren: './pages/manager/manager.module#ManagerModule',canActivate: [AuthGuard]},
  { path: 'statistics', component: StatisticsComponent,canActivate: [AuthGuard] },
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
