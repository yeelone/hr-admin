import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDetailComponent } from './shared/profile-detail/profile-detail.component';
import { AuthGuard } from './shared/injectable/authguard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileDetailComponent, canActivate: [AuthGuard] },
   { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
  { path: 'employee',  loadChildren: './pages/employee/employee.module#EmployeeModule', canActivate: [AuthGuard] },
  { path: 'org', loadChildren: './pages/organization/organization.module#OrganizationModule', canActivate: [AuthGuard]},
  { path: 'tags', loadChildren: './pages/tags/tags.module#TagsModule', canActivate: [AuthGuard] },
  { path: 'salary', loadChildren: './pages/salary/salary.module#SalaryModule', canActivate: [AuthGuard]},
  { path: 'manager', loadChildren: './pages/manager/manager.module#ManagerModule', canActivate: [AuthGuard]},
  { path: 'statistics',loadChildren: './pages/statistics/statistics.module#StatisticsModule', canActivate: [AuthGuard] },
  { path: 'task', loadChildren: './pages/audit/audit.module#AuditModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule', },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
